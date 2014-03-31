<?php
Class GTED {
  function __construct () {
    $config = require(dirname(__FILE__)."/../config.php");
    $ldapConfig = $config["ldap"];
    $this->tree = $ldapConfig["tree"];
    $this->rfidCardLength = $ldapConfig["rfidCardLength"];
    $this->link = $ldapconn = ldap_connect($ldapConfig["host"], $ldapConfig["port"]);
    if(!$this->link) {
      throw new Exception("Unable to connect to the LDAP database");
    } else {
      $ldapBind = ldap_bind($this->link, $ldapConfig["rdn"], $ldapConfig["password"]);
      if(!$ldapBind) {
        throw new Exception("Unable to bind to the LDAP database");
      }
    }
  }
  /*
    Creates an AND query for all parameters
    returns the results which match query, or a false for no results
  */
  public function query($params) {
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
    Return a single users information using either a 
    buzzcardid, gtusername, or gtid
  */
  public function getUser($userId) {
    $output = false;
    if(is_numeric($userId)) { //must be a buzzcard or gtid
      $userId = strval($userId);
      if(strlen($userId) >= 9) {
        $output = $this->queryGTID($userId);
      } else {
        $output = $this->queryBuzzCard($userId);
      }
    } else { //its a gt-username
      $output = $this->queryGTUsername($userId);
    }
    return $output;
  }
}


?>