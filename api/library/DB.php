<?php

Class DB {
  public $link = null;
  public $currentQuery = null; //last executed query's link

  /*
    Loads config, and creates a databse connection under $this->link
  */
  public function __construct ($dbName) {
    $config = require(dirname(__FILE__)."/../config.php");

    $dbConfig = null;
    if(!isset($config["dbs"][$dbName])) {
      throw new Exception("Database with the name of " . $dbName . " is not in the config file.");
    } else {
      $dbConfig = $config["dbs"][$dbName];
    }
    $hostStr = $dbConfig['type'] . ':host=' . $dbConfig['host'] . ';dbname=' . $dbName;
    $optionalParams = array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
    $this->link =new PDO($hostStr, $dbConfig['username'], $dbConfig['password'], $optionalParams);
  }
  /*
    Runs a query, and returns the link.
    Query Link can also be accessed through currentQuery property
  */
  public function query($sql, $params = array()) {
    $this->currentQuery = $this->prepare($sql);
    if($this->currentQuery->execute($params)) {
      return $this->currentQuery;     
    } else {
      return false;
    }
  }

  public function nextRow() {
    return $row = $this->currentQuery->fetch();
  }
  /*
    returns a prepared query obj
  */
  public function prepare($sql) {
    return $this->link->prepare($sql);
  }

  /*
    Fetchs all the results for the sql, params combo in the type specified.
    Defaults: returned as associative array, with no params.
    If failed to fetchAll rows from query, returns false
  */
  public function fetchAll($sql, $params = array(), $type = PDO::FETCH_ASSOC) {
    //Avoid force ppl to remember the PDO::FETCH_ aspect...makes for a bit cleaner code as well
    if(is_string($type)) {
      if(strtoupper($type) === "ASSOC") { 
        $type = PDO::FETCH_ASSOC; 
      } else if(strtoupper($type) === "COLUMN") {
        $type = PDO::FETCH_COLUMN;
      }  
    }
        
    $res = null;
    if($this->query($sql, $params)) { //successfull
      $res = $this->currentQuery->fetchAll($type);
    } else {   //query didn't successfully run
      return false;
    }

    if(count($res) > 0) {
      return $res;
    } else {
      return false; //no rows in result
    }
  }

  /*
    Returns the number of rows for the last executed query
    if not query not executed successfully, returns -1.
    Should not use this as a means of checking query success
  */
  public function rowCount($resultLink = null) {
    if(!empty($resultLink)) {
      return $resultLink->rowCount();
    }
    if(isset($this->currentQuery)) {
      return $this->currentQuery->rowCount();
    } else {
      return -1;
    }
  }
  function __destruct() {
    $this->link = null;
  }

}
?>