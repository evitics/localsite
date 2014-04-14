<?php
require_once( dirname(__FILE__) . '/Helpers.php');
Class GTED {
  private $ldapConfig;
  private $cacheDB;
  private static $cacheFields = array("username","gtid","buzzcardId");
  function __construct () {
    $config = require(dirname(__FILE__)."/../config.php");
    $this->ldapConfig = $config["ldap"];
    $this->tree = $this->ldapConfig["tree"];
    $this->rfidCardLength = $this->ldapConfig["rfidCardLength"];
    $this->link = null; //LDAP connection stored here
  }
  private function _connect2Ldap() {
    $ldapConfig = $this->ldapConfig;
    $this->link = $ldapconn = ldap_connect($ldapConfig["host"], $ldapConfig["port"]);
    //Have ldap timeout if it cannot connect after $ldapConfig['timeout'] seconds
    ldap_set_option($this->link, LDAP_OPT_NETWORK_TIMEOUT,$ldapConfig['timeout']);
    
    if(!$this->link) {
      throw new Exception("Unable to connect to the LDAP database");
    } else {
      $ldapBind = ldap_bind($this->link, $ldapConfig["rdn"], $ldapConfig["password"]);
      if(!$ldapBind) {
        throw new Exception("Unable to bind to the LDAP database");
      }
    }
  }
  private function _connect2Cache() {
    require_once(dirname(__FILE__)."/DB.php");
    if(!$this->cacheDB) {
      $this->cacheDB = new DB($this->ldapConfig["cache"]["database"]);
    }
    if($this->cacheDB) {
      return true;
    } else {
      return false;
    }
  }
  /*
    Gets (and potentially sets) cached result using the username field
  */
  public function _cacheByUsername($username) {
    //try and get cache
    if($cache = $this->_getCacheByField("username", $username)) {
      return $cache;  //cache hit
    }
    //cacheMiss
    $ldapData = $this->queryGTUsername($username);
    //if ldap hit
    if($ldapData) {
      $this->_setCacheByField("username", $username, $ldapData);
      return $ldapData; //return ldap
    } else {
      return false;
    }
  }
  /*
    Gets (and potentially sets) cached result using the gtid field
  */
  public function _cacheByGTID($gtid) {
    //try and get cache
    if($cache = $this->_getCacheByField("gtid", $gtid)) {
      return $cache; //cache hit
    }
    //cacheMiss
    $ldapData = $this->queryGTID($gtid);
    //if ldap hit
    if($ldapData) {
      $this->_setCacheByField("gtid", $gtid, $ldapData);
      return $ldapData; //return ldap
    } else {
      return false;
    }
  }
  /*
    Gets (and potentially sets) cached result using the buzzcardId field
  */
  public function _cacheByBuzzcardId($buzzcardId) {
    //try and get cache
    if($cache = $this->_getCacheByField("buzzcardId", $buzzcardId)) {
      return $cache; //cache hit
    }
    //cacheMiss
    $ldapData = $this->queryBuzzCard($buzzcardId);
    //if ldap hit
    if($ldapData) {
      $this->_setCacheByField("buzzcardId", $buzzcardId, $ldapData);
      return $ldapData; //return ldap
    } else {
      return false;
    }
  }
  private function _isValidCacheField($field) {
    if(!in_array($field, $this::$cacheFields)) {
      throw new Exception($file . ' is not a field which can be used to get an entry in the cache table');
      return false;
    } else {
      return true;
    }
  }
  private function _setCacheByField($field, $value, $data) {
    if(!$this->_isValidCacheField($field)) {
      return false;
    }
    //make sure we've connected to the cache
    if(!$this->cacheDB) {
      $this->_connect2Cache();
    }

    $sql = 'REPLACE INTO `%2$s`
                   (`username`, `gtid`, `buzzcardId`, `data`, `timestamp`) 
            VALUES (:username, :gtid, :buzzcardId, :data, NOW());';
    $sql = sprintf($sql, $field, $this->ldapConfig["cache"]["table"]);
    
    $sqlParams = array(
      "username"=>$data["gtprimarygtaccountusername"][0],
      "gtid"=>$data["gtgtid"][0],
      "buzzcardId"=>$data["gtaccesscardnumber"][0],
      "data"=>json_encode($data)
    );
    //if sql worked, then query returns link to query, else returns false....hence the true/false returns
    if($this->cacheDB->query($sql, $sqlParams)) {
      return true;
    } else {
      return false;
    }
  }
  /*
    Gets the cache using the specified field=>value combination
    E.g: $field = 'username', $value="gburdell3"
  */
  private function _getCacheByField($field, $value) {
    if(!$this->_isValidCacheField($field)) {
      return false;
    }
    //make sure we've connected to the cache
    if(!$this->cacheDB) { 
      $this->_connect2Cache(); 
    }
    //prepare sql statement
    $sql = 'SELECT `data` FROM `%s` WHERE `%s` = :value AND `timestamp` < DATE_ADD(`timestamp`, INTERVAL %s DAY)'; 
    $sql = sprintf($sql, $this->ldapConfig["cache"]["table"], $field, intval($this->ldapConfig["cache"]["ttl"]));
    $res = $this->cacheDB->fetchAll($sql, array(":value"=>$value));
    if($res && $res[0] && $res[0]["data"]) { //cacheHit
      return json_decode($res[0]["data"], true);
    } else { //cacheMiss
      return false;
    }
  }
  /*
    ***DOES NOT QUERY CACHE OR SET CACHE****
    Creates an AND query for all parameters
    returns the results which match query, or a false for no results.
  */
  public function query($params) {
    //make sure if we've connected to ldap
    if(!$this->link) {
      $this->_connect2Ldap();
    }
    //Default settings
    $from = 0;
    $maxSize = 25;
    $ldapQuery = "";
    //assing params to query or query settings
    foreach($params as $key=>$value) {
      if($key === "from") {
        $from = $value;
      } else if($key === "maxSize") {
        $maxSize = $value;
      } else { //add to query
        $ldapQuery .= "($key=$value)";
      }
    }
    $results = ldap_search($this->link, $this->tree, $ldapQuery);
    if(!$results) {
      return false;
    } else {
      return $this->filter($results, $from, $maxSize);
    }
  }
  /*
    Filters down the results from the given from/maxsize params
    if no results match params, then returns a boolean false
  */
  private function filter($result, $from, $maxSize) {
    $output = array();
    $currEntry = 0;
    $entries = ldap_get_entries($this->link, $result);
    $numEntries = $entries["count"];
    for($i = $from; $i < $maxSize && $i < $numEntries; ++$i) {
      array_push($output, $entries[$i]);
    }
    //If no results return false
    if(count($output) === 0) {
      $output = false;
    }
    return $output;
  }
  /*
    QUERIES CACHE AND SETS CACHE
    Queries GTED for the first result matching the given buzzCardId
    returns LDAP entry or false (No results match)
  */
  public function queryBuzzCard($buzzCardId) {
    //padd BuzzCardId with 0s if necessary
    $buzzCardId = $this->padWithZeros($buzzCardId, $this->rfidCardLength);

    return $this->firstResult($this->query(array(
      "gtaccesscardnumber" => $buzzCardId,
      "from" => 0,
      "maxSize" => 1
    )));
  }
  /*
    Queries GTED for the first result matching the given GTID
    returns LDAP entry or false (No results match)
  */
  public function queryGTID($gtid) {
    return $this->firstResult($this->query(array(
      "gtgtid" => $gtid,
      "from" => 0,
      "maxSize" => 1
    )));
  }
  /*
    Queries GTED for the first result matching the given gt-username
    returns ldap entry or false (no results match)
  */
  public function queryGTUsername($username) {
    return $this->firstResult($this->query(array(
      "gtprimarygtaccountusername" => $username,
      "from" => 0,
      "maxSize" => 1
    )));
  }
  /*
    Padds the $string2pad with leading 0s.
    E.g: padWithZeros("323125", 9) === "000323125"
  */
  public function padWithZeros($string2Pad, $wantedLength) {
    $padding = "";
    for($i = strlen($string2Pad); $i < $wantedLength; ++$i) {
        $padding .= '0';
    }
    return $padding . $string2Pad;
  } 
  /*
    Get just the first query result
  */
  public function firstResult($queryResult) {
    if($queryResult !== false) {
      return $queryResult[0]; //just send ldap entry
    } else {
      return false;
    }
  }
  /*
    *****USES THE GTED CACHE*****
    Return a single users information using either a 
    buzzcardId, gtusername, or gtid
  */
  public function getUser($userId) {
    $output = false;
    $isNumeric = is_numeric($userId);
    $strLength = strlen('' . $userId);
    $bitLength = strlen('' . decbin(intval($userId)));
    //check if gt-username
    if(!$isNumeric) {
      $output = $this->_cacheByUsername($userId);
    //check if a gtid
    } else if($isNumeric && $strLength == 9) {
      $output = $this->_cacheByGTID(strval($userId));
    //check if parsed out buzzcard id
    } else if($isNumeric && $strLength == 6 && $bitLength == 19) {
      $output = $this->_cacheByBuzzcardId($userId);
    //check if a raw buzzcard output
    } else if($isNumeric && $strLength >= 6 && $bitLength > 19) {
      $output = $this->_cacheByBuzzcardId(Helpers::parseRawBuzzCard($userId)); 
    }
    return $output;
  }
  /*
    Returns an object with more sane object key's
  */
  public function saneitize($gtedInfo) {
    $output = array();
    $output['username'] = $gtedInfo['gtprimarygtaccountusername'];
    $output['curriculum'] = $gtedInfo['gtcurriculum'][1];
    $output['email'] = $gtedInfo['mail'][0];
    //might not exist
    if(isset($output['telephonenumber'])) {
      $output['phone'] = $gtedInfo['telephonenumber'][0];
    }
    
    $output['affiliation'] = $gtedInfo['edupersonprimaryaffiliation'][0];
    $output['name'] = array(
      'first'=>$gtedInfo['givenname'][0],
      'last'=>$gtedInfo['sn'][0],
      'full'=>$gtedInfo['cn'][0],
    );
    return $output;
  }
}


?>