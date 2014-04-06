<?php

require_once("./library/DB.php");

class Organization {

  public static function get($id) {
    $config = require("./config.php");

    if(empty($id)){
      return $this::getAll();
    }
    
    $jacketpagesDB = new DB("jacketpages");
    $query = "SELECT * FROM `organizations` WHERE `orgId` =:orgId"; 
    
    $organization = $jacketpagesDB->fetchAll($query, array("orgId"=>$id));
    if($organization) {
      $organization = $organization[0]; //there should only ever be 1 row
      $organization["logo_path"] = $config["jacketpagesURL"] . $organization["logo_path"];
    }
    return $organization;
  }

  public static function getAll() {
    $config = require("./config.php");
    $jacketpagesDB = new DB("jacketpages");
    $query = "SELECT `orgId`, `name`, `short_name`, `description`, `logo_path` FROM `organizations` ORDER BY `name` ASC";
    
    $organizations = $jacketpagesDB->fetchAll($query, array());

    foreach($organizations as &$organization) {
      $organization["logo_path"] = $config["jacketpagesURL"] . $organization["logo_path"];
    }   
    return $organizations;  
  }
}


?>
