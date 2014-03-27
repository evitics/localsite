<?php

require("./library/DB.php");
require("./config.php");

class MeetingRoutes {
  public static function getMeetId($mid) 
  {
	$db = new DB("evitics");
	
try 
{ $query = "SELECT `orgId`, `meetingId`, `description` FROM `meetings` WHERE `meetingId` =:meetingId AND `orgId` =:orgId";
			
		$result = $db->fetchAll($query, array("meetingId"=>$mid));
	 	
		echo json_encode($result);
        }
	catch(Exception $e) 
	{
      		echo '{"error" : "Something broke :("}';
    	}
  }

  public static function getOrgId($oid)
  {
	$db = new DB("evitics");
	try
	{
		$query = "SELECT `orgId`, `meetingId`, `description` FROM `meetings` WHERE `orgId` =:orgId"
		$result = $db->fetchAll($query, array("orgId"=>$oid));
		 	
		echo json_encode($result);	
	}
	catch(Exception $e) 
	{
      		echo '{"error" : "Something broke :("}';
    	}
  } 
 
public static function join($id) 
  {
    echo "Joining organization with Id: $id";
  }
}


?>

