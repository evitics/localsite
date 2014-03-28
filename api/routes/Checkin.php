<?php
Class Checkin {
  public function __construct () {
    require_once("./library/DB.php");
    require_once("./library/GTED.php");
    require_once("./library/Helpers.php");
    $this->gted = new GTED();
    $this->userDb = new DB("users");
    $this->checkinDb = new DB("checkin");

  }
  public function getStaistics($orgId, $meetingId) {
    $orgId = Helpers::orgId2Int($orgId);
    
    $sql = "SELECT COUNT(`timestamp`) FROM $org WHERE `meetingId` = :meetingId AND `timestamp` > DATE_SUB(NOW(), INTERVAL 6 HOURS)";
    $attendance = $this->checkinDb->fetchAll($sql, array("meetingId"=>$meetingId), "COLUMN");
    if($attendance) {
      $attendance = $attendance[0][0]; //first record, first field
    }
  }
  /*
    Checks in a guest, returns true if successful, or false if unsucsessful
  */
  public function guest($orgId, $meetingId, $userId) {
    if($this->isLoggedInOrg($orgId) && !$this->isCheckedIn($orgId, $meetingId, $userId)) {
      return $this->checkInUser($orgId, $meetingId, $userId);
    } else {
      return false;
    }
  }
  /*
    Gets records in desc order
  */
  public function getRecords($orgId, $meetingId, $number) {
    $orgId = Helpers::orgId2Int($orgId);

    $number = intval($number);
    $sql = "SELECT * FROM $orgId WHERE `meetingId` = :meetingId ORDER BY `timestamp` DESC LIMIT 0, $number";
    $records = $this->checkinDb->fetchAll($sql, array("meetingId"=>$meetingId));
    
    //Check if user has ever checked into this organization
    $existsQuery = $this->checkinDb->prepare("SELECT * FROM $orgId WHERE `meetingId` = :meetingId AND `userId` = :userId");
    for($i=0; $i < count($records); ++$i) {
      if($existsQuery->execute(array("meetingId"=>$meetingId, "userId"=>$record[$i]["userId"]))) {
        if($existsQuery->rowCount() === 0) {
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
    $orgId = Helpers::orgId2Int($orgId);

    try {
      $userId = $this->gtedUser($userId)["gtprimarygtaccountusername"][0];
    } catch(Error $e) {
      return false;
    }
    $sql = "INSERT INTO
             $orgId (`userId`, `meetingId`, `timestamp`, `by`)
            VALUES  (:userId ,  :meetingId,  now(), :by )
           ";
    if($this->checkinDb->query($sql, array("userId"=>$userId, "meetingId"=>$meetingId, "by"=>$GLOBAL["USERNAME"]))) {
      return true;
    } else {
      return false;
    }

  }
  /*
    Returns trus if the specified user hasn't checked into the meetingId 
    in the past 6 hours
  */
  public function isCheckedIn($orgId, $meetingId, $userId) {
    $orgId = Helpers::orgId2Int($orgId);
    
    $sql = "SELECT * FROM $orgId WHERE `timestamp` > DATE_SUB(NOW(), INTERVAL 6 HOURS) AND `userId` = :userId";
    $this->checkinDb->query($sql, array("userId" => $userId));
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
  public function isLoggedInOrg($orgId) {
    $sql = "SELECT * FROM `users` WHERE `userId` = :userId AND `orgId` = :orgId";
    $this->userDb->query($sql, array("orgId"=>$orgId, "userId"=>$GLOBAL["USERNAME"]));
    if($this->userDb->rowCount() >= 1) {
      return true;
    } else {
      return false;
    }
  }
  /*
    Returns the GTED LDAP results for any gtid, gtusername, or buzzcard id
  */
  public function gtedUser($userId) {
    $output = null;
    if(is_numeric($userId)) { //must be a buzzcard or gtid
      $userId = strval($userId);
      if(strlen($userId) >= 9) {
        $output = $this->gted->queryGTID($userId);
      } else {
        $output = $this->gted->queryBuzzCard($userId);
      }
    } else { //its a gt-username
      $output = $this->gted->queryGTUsername($userId);
    }
    return $output;
  }
}

?>