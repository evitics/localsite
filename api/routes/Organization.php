<?php

require_once("./library/DB.php");
require_once("./library/Helpers.php");

class Organization {
  public static function createCheckinTable($orgId) {
    $checkinDB = new DB('checkin');
    $orgId = Helpers::id2Int($orgId);
    $sql = 'CREATE TABLE IF NOT EXISTS `'.$orgId.'` ( ' .
              '`userId` varchar(255) NOT NULL, '        .
              '`meetingId` int(11) NOT NULL, '          .
              '`timestamp` datetime NOT NULL, '         .
              '`checkedInBy` varchar(255) NOT NULL, '   .
              'KEY `checkedInBy` (`checkedInBy`), '     .
              'KEY `meetingId` (`meetingId`), '         .
              'KEY `userId` (`userId`)  '               .
            ') ENGINE=InnoDB DEFAULT CHARSET=utf8';   
    if($checkinDB->query($sql, array())) {
      return true;
    } else {
      return false;
    }
  }
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
