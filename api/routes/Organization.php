<?php

require("./library/DB.php");
require("./config.php");

class Organization {
  public static function get($id) 
  {
	$db = new DB("jacketpages");
	try 
	{
		$query = "SELECT `orgId`, `name`, `description`, `logo_path` FROM `organizations` WHERE `orgId` =:orgId";	
		$result = $db->fetchAll($query, array("orgId"=>$id));
		foreach($result as &$value)
		{
			$value["logo_path"] = "http://jacketpages.gatech.edu". $value["logo_path"];
		} 	
		echo json_encode($result);
        }
	catch(Exception $e) 
	{
      		echo '{"error" : "Something broke :("}';
    	}
  }
  public static function getAll() 
  {
	$db = new DB("jacketpages");
	try
	{
		$query = "SELECT `orgId`, `name`, `description`, `logo_path` FROM `organizations`";
		$result = $db->fetchAll($query, array());
		foreach($result as &$value)
		{
			$value["logo_path"] = "http://jacketpages.gatech.edu". $value["logo_path"];
		} 	
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
