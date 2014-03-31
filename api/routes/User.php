<?php
require_once("./library/DB.php");
require_once("./library/GTED.php");
class User {
  public static function get($userId) {
    $config = require("./config.php");
    //Only allow logged in users to request data on themselves
    if($userId !== $GLOBALS["USERNAME"]) {
      throw new Exception("Cannot request user information on people other than yourself");
      return false;
    }
    $eviticsDB = new DB("evitics");
    $jacketpagesDB = new DB("jacketpages");
    $gted = new GTED();
    $result = array();
    
    //Getting the User info from GTED   
    $userInfo = $gted->getUser($userId);
    if(!$userInfo) { throw new Error("User with username: $userId was not found"); }
    $result["username"] = $userInfo["gtprimarygtaccountusername"][0];
    $result["email"] = $userInfo["mail"][0];
    
    $result["name"] = array();
    $result["name"]["first"]= $userInfo["givenname"][0];
    $result["name"]["last"] = $userInfo["sn"][0];  
    
    $userQuery = "SELECT `orgId`, `writePerm`, `isPending` FROM `user` WHERE `userId`=:userId"; 
    $userRecords = $eviticsDB->fetchAll($userQuery, array("userId"=>$userId));
    /*
      Do to some weird ass PHP shit, count(false) === 1.
      we want count(false) === 0, therefore set as empty array as
      count(array()) === 0
    */
    if($userRecords === false) {
      $userRecords = array();
    }
    
    $orgQuery = "SELECT * FROM `organizations` WHERE `orgId`=:orgId";  
    $preparedOrgQuery = $jacketpagesDB->prepare($orgQuery);

    $meetingQuery = "SELECT * FROM `meeting` WHERE `orgId` = :orgId";
    $preparedMeetingQuery = $eviticsDB->prepare($meetingQuery);

    //attach all organization information
    $orgs = array();
    for($i=0, $l = count($userRecords); $i < $l; ++$i) {
      //If Checks if organization exists, and we can get jacketpages info on said org
      $orgId = $userRecords[$i]["orgId"];
      if($preparedOrgQuery->execute(array("orgId"=>$orgId)) && $preparedOrgQuery->rowCount() === 1) {
        $orgs[$i] = array();
        $orgs[$i]["orgId"]     = $orgId;
        $orgs[$i]["writePerm"] = $userRecords[$i]["writePerm"];
        $orgs[$i]["isPending"] = $userRecords[$i]["isPending"];    

        //fetch organization information
        $org = $preparedOrgQuery->fetchAll(PDO::FETCH_ASSOC);
        $org = $org[0];
        
        foreach($org as $column=>$value) {
          $orgs[$i][$column] = $value;
        }
        //add jacketpages url to logo path
        $orgs[$i]["logo_path"] = $config["jacketpagesURL"] . $orgs[$i]["logo_path"];
        
        //Fetch organization's meeting
        $orgs[$i]["meetings"] = array();

        if($preparedMeetingQuery->execute(array("orgId"=>$orgId)) && $preparedMeetingQuery->rowCount() > 0) {
          $orgs[$i]["meetings"] = $preparedMeetingQuery->fetchAll(PDO::FETCH_ASSOC);
        } 
      }
    }
    $result["organizations"] = $orgs;
    return $result;
  }
  public static function permissions($id) 
  {
    echo "Changing permissions for: $id";
  }
}
?>
