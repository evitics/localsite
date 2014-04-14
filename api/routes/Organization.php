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
    $query = "SELECT `orgId`, `name`, `short_name`, `description`, `logo_path` FROM `organizations` WHERE `status` = 'Active' ORDER BY `name` ASC";
    
    $organizations = $jacketpagesDB->fetchAll($query, array());

    foreach($organizations as &$organization) {
      $organization["logo_path"] = $config["jacketpagesURL"] . $organization["logo_path"];
    }   
    return $organizations;  
  }
  /*
    Returns organization with sane fieldnames
  */
  public static function saneitize($orgObj) {
    $output =  array(
      'id' => $orgObj['orgId'],
      'name' => $orgObj['name'],
      'description' => $orgObj['description'],
      'dues' => $orgObj['dues'],
      'logoURL'=>$orgObj['logo_path'],
    );
    //only add if not empty
    $sometimesEmpty = array(
      'short_name' => 'abbreviation',
      'website'=>'website',
      'phone_number'=>'phone',
      'org_email'=>'email',
      'fax_number'=>'fax',
      'annual_events'=>'annualEvents',
      'charter_date' => 'created',
      'elections'=>'elections',
      'meeting_information' => 'meetingInformation',
      'meeting_frequency'=>'meetingFrequency',
    );
    foreach($sometimesEmpty as $sqlField=>$saneField) {
      $testVal = trim($orgObj[$sqlField]);
      if(!empty($testVal)) {
        $output[$saneField] = $orgObj[$sqlField];
      }
    }
    return $output;
  }
  public static function requestJoin($orgId, $userId) {
    $requestDB = DB("evitics");
  }
}


?>
