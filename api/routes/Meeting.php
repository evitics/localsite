<?php

require_once("./library/DB.php");

class Meeting {
  public static function create($params) {
    //require param
    if(empty($params['name']) || empty($params['orgId'])) {
      return array("error"=>"To create a meeting reequries a meeting name and orgId");
    }

    //for optional params that are not set, set them to null
    if(!isset($params['onCheckIn'])) {
      $params['onCheckIn'] = null;
    } 

    //if meetingId not specified, let MySQL generate it
    if(isset($params['meetingId'])) {
      $meetingId = $params['meetingId'];
      $values = array(
          '(`meetingId`, `orgId`, `name`, `onCheckIn`)',
          '(:meetingId , :orgId , :name , :onCheckIn )'
      );
    } else {
      $values = array(
          '(`orgId`, `name`, `onCheckIn`)',
          '(:orgId , :name , :onCheckIn )'
      );
    }
    
    $sql = 'REPLACE INTO `meeting`' . $values[0] .' VALUES ' . $values[1];
    $db = new DB('evitics');

    if($db->query($sql, $params)) {
      $sql = 'SELECT * FROM `meeting` WHERE `meetingId` = :lastInsertId';
      return $db->fetchAll($sql, array('lastInsertId'=>$db->lastInsertId()))[0];
    } else {
      return array('error'=>'Could not create/update meeting');
    }
  }
  public static function getMeetId($orgId, $meetingId) 
  {
	$db = new DB("evitics");
	$query = "SELECT * FROM `meeting` WHERE `meetingId` = :meetingId AND `orgId` = :orgId";
//	$query = "SELECT `orgId`, `meetingId`, `description` FROM `meetings` WHERE `meetingId` =:meetingId AND `orgId` =:orgId";
			
	$result = $db->fetchAll($query, array("meetingId"=>$meetingId, "orgId"=>$orgId));
  	if($result && count($result) ==1) {
		$result = $result[0];
	}
	return $result;
  }

  public static function getOrgId($orgId)
  {
	$db = new DB("evitics");
	$query = "SELECT * FROM `meeting` WHERE `orgId` =:orgId";
		$result = $db->fetchAll($query, array("orgId"=>$orgId));
		 	
		if($result && count($result) ==1) {
		$result = $result[0];
	}
	return $result;
  }
}


?>

