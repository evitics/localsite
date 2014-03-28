<?php
require_once("./library/DB.php");
require_once("./library/GTED.php");
require_once("./config.php");

class User {
  public static function get($userId) {
    //Only allow logged in users to request data on themselves
    if($userId !== $GLOBALS["USERNAME"]) {
      throw new Error("Cannot request user information on people other than yourself");
      return false;
    }
    $eviticsDB = new DB("evitics");
    $jacketpagesDB = new Db("jacketpages");
    $gted = new GTED(); 

    $result = array();
    
    //Getting the User info from GTED   
    $userinfo = $gted->getUser($userId);
    $result["email"] = $userinfo["mail"][0];
    $result["firstname"]= $userinfo["givenname"][0];
    $result["lastnname"] = $userinfo["sn"][0];  
    
    $userQuery = "SELECT `orgId`, `writePerm`, `isPending` FROM `user` WHERE `userId`=:userId"; 
    $userRecords = $eviticsDB->fetchAll($userQuery, array("userId"=>$userId));
    if($userRecords === false) {
      throw new Error("Could not fetch user with userId: " . $userId);
      return false; 
    }
    
    $orgQuery = "SELECT `orgId`,`name`, `description`, `website`, `logo_path`, `org_email`, `phone_number` FROM `organizations` WHERE `orgId`=:orgId";  
    $preparedOrgQuery = $jacketpagesDB->prepare($orgQuery);


    for($i=0, $l = count($userRecords); $i < $l; ++$i) {
      //If Checks if organization exists, and we can get jacketpages info on said org
      if($preparedOrgQuery->execute($query2, array("orgId"=>$userRecords[$i]["orgId"]))) {
        $result["organizations"][$i]["orgId"]     = $userRecords[$i]["orgId"];      
        $result["organizations"][$i]["writePerm"] = $userRecords[$i]["writePerm"];
        $result["organizations"][$i]["isPending"] = $userRecords[$i]["isPending"];    
        
        $org = $preparedOrgQuery->fetchAll();
        $result["organizations"][$i]["name"] = $org[0]["name"];
        $result["organizations"][$i]["website"] = $org[0]["website"];
        $result["organizations"][$i]["description"] = $org[0]["description"];  
        $result["organizations"][$i]["email"] = $org[0]["org_email"];      
        $result["organizations"][$i]["phone"] = $org[0]["phone_number"];
        $result["organizations"][$i]["logo"] = "http://jacketpages.gatech.edu". $org[0]["logo_path"];              
      }
    }
    return $result;
  }
  public static function permissions($id) 
  {
    echo "Changing permissions for: $id";
  }
}
?>
