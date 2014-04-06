<?php
Class Checkin {
  public function __construct () {
    require_once("./library/DB.php");
    require_once("./library/GTED.php");
    require_once("./library/Helpers.php");
    $this->gted = new GTED();
    $this->userDb = new DB("evitics");
    $this->checkinDb = new DB("checkin");

  }
  public function getStaistics($orgId, $meetingId) {
    $orgId = Helpers::id2Int($orgId);
    $sql = "SELECT COUNT(`userId`) FROM `$orgId` WHERE `meetingId` = :meetingId AND `timestamp` > DATE_SUB(NOW(), INTERVAL 6 HOUR)";
    $attendance = $this->checkinDb->fetchAll($sql, array("meetingId"=>$meetingId), "NUMERIC");
    if($attendance) {
      $attendance = $attendance[0]; //first record, first field
    }
    return array("attendance"=>$attendance);
  }
  /*
    Checks in a guest, returns true if successful, or false if unsucsessful
  */
  public function guest($orgId, $meetingId, $userId) {

    $gtUsername = null;
    $gtFullName = "";
    //get userId in form of gtusername
    try {
      $userGTED = $this->gted->getUser($userId);
      $gtUsername = $userGTED["gtprimarygtaccountusername"][0];
      $gtFullName = $userGTED["cn"][0];
    } catch(Exception $e) {
      //disregard exceptions, empty($userId) takes care of err handling
    }

    if(empty($gtUsername)) {
      return array("error"=>"There is no user with an id of: " . $userId, "userId"=>$userId);
    }

    //Check if logged in user belongs to org
    if(!$this->doesBelong2Org($GLOBALS["USERNAME"], $orgId)) {
      return array("error"=>"Logged in user (".$GLOBALS["USERNAME"].") does not belong to orgId: ". $orgId, "userId"=>$userId);
    }
    
    //Check if guest has already checked in
    if(!$this->isCheckedIn($orgId, $meetingId, $gtUsername)) {
      $res = $this->checkInUser($orgId, $meetingId, $gtUsername);
      //if error, pass it
      if(isset($res["error"])) { 
        return $res; 
      } else { //else pass a success!
        return array("success"=>$gtFullName . " was checked in");
      } 
    } else {
      return array("warning"=>"".$gtFullName . " has already checked in", "userId"=>$userId);
    }
  }
  /*
    Gets records in desc order
  */
  public function getRecords($orgId, $meetingId, $number) {
    $orgId = Helpers::id2Int($orgId);
    $number = intval($number);

    $sql = "SELECT `userId`, `timestamp`, `by` FROM `$orgId` WHERE `meetingId` = :meetingId ORDER BY `timestamp` DESC LIMIT 0, $number";
    $records = $this->checkinDb->fetchAll($sql, array("meetingId"=>$meetingId));
    
    //Check if user has ever checked into this organization
    $existsQuery = $this->checkinDb->prepare("SELECT COUNT(*) FROM `$orgId` WHERE `userId` = :userId");
    $existsQuery->setFetchMode(PDO::FETCH_NUM);
    //For w/e reason count(false) == 1...go figure
    $iterations = 0;
    if(is_array($records)) { $iterations = count($records); }

    for($i=0; $i < $iterations; ++$i) {
      if($existsQuery->execute(array("userId"=>$records[$i]["userId"]))) {
        $userInfo = $this->gted->getUser($records[$i]["userId"]);
      
        $records[$i]["name"] = array();
        $records[$i]["name"]["first"] = $userInfo["givenname"][0];
        $records[$i]["name"]["last"] = $userInfo["sn"][0];
        $records[$i]["name"]["full"] = $userInfo["cn"][0];
        
        
        $records[$i]["affiliation"]  = $userInfo["edupersonprimaryaffiliation"][0];
        $userCheckedIn = $existsQuery->fetchAll();
        if(isset($userCheckedIn[0]) && isset($userCheckedIn[0][0]) && $userCheckedIn[0][0] == 1) {
          $records[$i]["isNew"] = true;
        } else {
          $records[$i]["isNew"] = false;
        }
        
      }
    }
    return $records;
  }
  /*
    adds the gtusername associated with userId to our checkin table
  */
  private function checkInUser($orgId, $meetingId, $userId) {
    $orgId = Helpers::id2Int($orgId);

    $sql = "INSERT INTO `$orgId` (`userId`, `meetingId`, `timestamp`, `by`) VALUES  (:userId ,  :meetingId,  now(), :by )";
    if($this->checkinDb->query($sql, array("userId"=>$userId, "meetingId"=>$meetingId, "by"=>$GLOBALS["USERNAME"]))) {
      return true;
    } else {
      return array("error"=>"Could not checkin: " . $userId . ", into meeting: " . $meetingId . ", for organization: " . $orgId);
    }

  }
  /*
    Returns trus if the specified user hasn't checked into the meetingId 
    in the past 6 hours
  */
  public function isCheckedIn($orgId, $meetingId, $userId) {
    $orgId = Helpers::id2Int($orgId);
    $meetingId = Helpers::id2Int($meetingId);
    $sql = "SELECT * FROM `$orgId` WHERE `timestamp` > DATE_SUB(NOW(), INTERVAL 6 HOUR) AND `userId` = :userId AND `meetingId` = :meetingId";
    $this->checkinDb->query($sql, array("userId" => $userId, "meetingId" => $meetingId));

    if($this->checkinDb->rowCount() === 0) {
      return false;
    } else {
      return true;
    }
  }
  /*
    Returns true if logged in user belogns to said org id
            false if logged in user doesn't belong to said org id
  */
  public function doesBelong2Org($userId, $orgId) {

    $sql = "SELECT * FROM `user` WHERE `userId` = :userId AND `orgId` = :orgId";

    $this->userDb->query($sql, array("orgId"=>$orgId, "userId"=>$userId));
    if($this->userDb->rowCount() >= 1) {
      return true;
    } else {
      return false;
    }
  }
}

?>