<?php

require_once("./library/DB.php");
require_once("./config.php");

class Organization {

  public static function get($id) {
    if(empty($id)){
      return $this::getAll();
    }
    
    $jacketpagesDB = new DB("jacketpages");
    $query = "SELECT `orgId`, `name`, `description`, `logo_path` FROM `organizations` WHERE `orgId` =:orgId"; 
    
    $organization = $jacketpagesDB->fetchAll($query, array("orgId"=>$id));
    if($organization) {
      $organization = $organization[0]; //there should only ever be 1 row
      $organization["logo_path"] = $config["jacketpagesURL"] . $value["logo_path"];
    }
    return $organization;
  }

  public static function getAll() {
    $jacketpagesDB = new DB("jacketpages");
    $query = "SELECT `orgId`, `name`, `description`, `logo_path` FROM `organizations`";
    
    $organizations = $jacketpagesDB->fetchAll($query, array());
    foreach($organizations as &$organization) {
      $organization["logo_path"] = $config["jacketpagesURL"] . $value["logo_path"];
    }   
    return $result;  
  }
 
}


?>
