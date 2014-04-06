<?php

require_once("./library/DB.php");

class Meetings {
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


	public static function delMeet($orgID, $meetingID)
	{
		$db = new DB("evitics");
		$sql = "DELETE FROM `meeting` WHERE `orgID` =:orgid AND `meetingID` =:meetingID";
		$result = $db->query($sql, array("ordID"=>$orgID, "meetingID"=>$meetingID));
		return $result;
		
	}

?>

