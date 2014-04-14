<?php
require_once('./library/DB.php');
require_once('./library/GTED.php');
require_once('./library/Helpers.php');
require_once('./routes/Meeting.php');
require_once('./routes/Organization.php');
require_once('./library/Email.php');

Class Checkin {
  private $gted;
  private $userDb;
  private $checkinDb;
  
  public function __construct () {    
    $this->gted = new GTED();
    $this->userDb = new DB("evitics");
    $this->checkinDb = new DB("checkin");
  }
  public function createCheckinTable($orgId) {
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
    if($this->checkinDb->query($sql, array())) {
      return true;
    } else {
      return false;
    }
  }
  public function getStatistics($orgId, $meetingId) {
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
    $userGTED = $this->gted->getUser($userId);
    $gtUsername = $userGTED["gtprimarygtaccountusername"][0];
    $gtFullName = $userGTED["cn"][0];
    
    if(empty($gtUsername)) {
      return array("error"=>"There is no user with an id of: " . $userId, "userId"=>$userId);
    }

    //Check if logged in user belongs to org
    if(!$this->doesBelong2Org($GLOBALS["USERNAME"], $orgId)) {
      return array("error"=>"Logged in user (".$GLOBALS["USERNAME"].") does not belong to orgId: ". $orgId, "userId"=>$userId);
    }
    $this->createCheckinTable($orgId);
    //Check if guest has already checked in
    if(!$this->isCheckedIn($orgId, $meetingId, $gtUsername)) {
      $res = $this->checkInUser($orgId, $meetingId, $gtUsername);
      //Error, pass it
      if(isset($res["error"])) { 
        return $res; 
      //Checked in guest successfully
      } else {
        //send an email if requested
        $emailRes = $this->sendEmail($userId, $orgId, $meetingId);
        if(isset($emailRes['error'])) {
          return $emailRes;
        } else {
          //return w/success
          return array("success"=>$gtFullName . " was checked in");
        }
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

    $sql = "SELECT `userId`, `timestamp`, `checkedInBy` FROM `$orgId` WHERE `meetingId` = :meetingId ORDER BY `timestamp` DESC LIMIT 0, $number";
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
    $sql = "INSERT INTO `$orgId` (`userId`, `meetingId`, `timestamp`, `checkedInBy`) VALUES  (:userId ,  :meetingId,  now(), :checkedInBy )";
    if($this->checkinDb->query($sql, array("userId"=>$userId, "meetingId"=>$meetingId, "checkedInBy"=>$GLOBALS["USERNAME"]))) {
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
    $sql = "SELECT * FROM `user` WHERE `userId` = :userId AND `orgId` = :orgId AND `isPending` = 0";
    $this->userDb->query($sql, array("orgId"=>$orgId, "userId"=>$userId));
    if($this->userDb->rowCount() >= 1) {
      return true;
    } else {
      return false;
    }
  }
  /*
    Returns true if the user has never checked in before, or only
    checked in once for said organization (or organization->meeting)
  */
  public function isNewUser($userId, $orgId, $meetingId = false) {
    Helpers::id2Int($orgId);
    $newUserSQL = "SELECT COUNT(*) as `total` FROM `$orgId` WHERE `userId` = :userId";
    $sqlParams = array('userId'=>$userId);

    if($meetingId) { 
      $newUserSQL .= " AND `meeetingId` = :meetingId"; 
      $sqlParams['meetingId'] = $meetingId;
    }
    $isNew = $this->checkinDb->fetchAll($newUserSQL, $sqlParams);
    
    if(isset($isNew[0]) && isset($isNew[0]['total']) && $isNew[0]['total'] <= 1) { 
      return true;
    } else {
      return false;
    }
  }
  /*
    Returns:
      false if somethign went wrong,
      -1: sendEmailOnCheckin was false
      true: sent an email successfully
      2: sendEmailOnCheckin was for only new guests, guest wasn't new
  */
  public function sendEmail($userId, $orgId, $meetingId) {
    $orgId = Helpers::id2Int($orgId); //sanatize orgId
    
    //get meeting information
    $meeting = Meeting::getMeetId($orgId, $meetingId);
    if(!$meeting) { return false; } //Could not fetch meeting

    //if we should send an email, return
    if($meeting['sendEmailOnCheckin'] == 'false') { //we shouldn't send an email
      return 1;
    }
    
    //get the guest's information
    $gted = new GTED();
    $guest = $gted->saneitize($gted->getUser($userId));
    if(!$guest) { return false; } //could not fetch guest

    //if we only want to send emails to new guests, and guest  wasn't new, return
    if(strtolower($meeting['sendEmailOnCheckin']) == 'new' && 
      $this->isNewUser($guest['username'], $orgId)) {
      return 2;
    }

    //Get the organization's information
    $organization = Organization::get($orgId);
    if(!$organization) { return false; } //could not fetch organizaiton
    
    $organization = Organization::saneitize($organization); 
    $saneMeeting = Meeting::saneitize($meeting);
    //generate handlebar's template context
    $context = array(
      "meeting"=>$saneMeeting,
      "organization"=>$organization,
      "guest"=>$guest
    );
    return Email::send(array(
      'to'=>$meeting['emailTo'],
      'from'=>$meeting['emailFrom'],
      'subject'=>$meeting['emailSubject'],
      'message'=>$meeting['emailMessage'],
      'context'=>$context
    ));

  }
}

?>
