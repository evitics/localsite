<?php

require_once(dirname(__FILE__).'/../library/DB.php');
require_once(dirname(__FILE__).'/../library/Helpers.php');
require_once(dirname(__FILE__).'/../library/GTED.php');
require_once(dirname(__FILE__).'/../library/Email.php');
require_once(dirname(__FILE__).'/../routes/User.php');

class Organization {
  public static function createCheckinTable($orgId) {
    if(empty($orgId) || !Organization::get($orgId)) {
      throw new Exception($orgId . " is not a valid orgId");
    }
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
    $config = require(dirname(__FILE__)."/../config.php");

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
    $config = require(dirname(__FILE__)."/../config.php");
    $jacketpagesDB = new DB("jacketpages");
    $query = "SELECT `orgId`, `name`, `short_name`, `description`, `logo_path` FROM `organizations` ORDER BY `name` ASC";
    
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
  /*
    returns an array with two properties, user and pending.
      user = list of pending users
      pending = list of users awaiting approval.
  */
  public static function permissionList($orgId) {
    $eviticsDB = new DB("evitics");
    $sql = "SELECT `userId`, `writePerm` FROM `user` WHERE `orgId` = :orgId";
    $users = $eviticsDB->fetchAll($sql . ' and `isPending` = 0', array('orgId'=>$orgId));
    $pending = $eviticsDB->fetchAll($sql . ' and `isPending` = 1', array('orgId'=>$orgId));
    if(!$users) { $users = array(); }
    if(!$pending) { $pending = array(); }
    return array('users'=>$users, 'pending'=>$pending);
  }
  public static function requestJoin($userId, $orgId) {
    $gted = new GTED();
    $userInfo = $gted->getUser($userId);
    if(!$userInfo) {
      throw new Exception("User was not found in gted");      
    }
    $userId = $userInfo['gtprimarygtaccountusername'][0];

    //check if user has already requested to join the organization
    if(self::hasRequestedJoin($userId, $orgId)) {
      return array('warning'=>'user has already requested to join the organization');
    }

    //add user as pending
    $ref = self::addPendingUser($userId, $orgId);
    if(!$ref) {
      return array('error'=>'could not fulfill your request to join said organization');
    }
    //generate uuid, and store it in request table
    $ref = self::addPendingRequest($userId, $orgId);
    if(!$ref) {
      return array('warning'=>'could not send out email to organization head, but your request has been sent');
    }
    //send email out to organization head
    if(!self::sendPendingEmail($userId, $orgId, $ref)) {
      return array('error'=>'added as pending, but organization head could not be contacted. Please contact evitics administrator');
    } else {
      return array('success'=>'email sent to organization');
    }
    
  }
  public static function sendPendingEmail($userId, $orgId, $ref) {
    $jacketpagesDB = new DB('jacketpages');
    $sql = 'SELECT `org_email` FROM `organizations` WHERE `orgId` = :orgId';
    $res = $jacketpagesDB->fetchAll($sql, array('orgId'=>$orgId));
    if($res && isset($res[0]) && !empty($res[0]['org_email'])) {
      $emailParams = array(
        'to' => $res[0]['org_email'],
        'from' => 'noreply@evitics.com',
        'subject' => $userId . ' has requested to join your organization',
        'message' =>  'Hi,' . "\n" .
                  '   To add ' . $userId . ' to your organization, please navigate to the following url:' . "\n" .
                  '   http://evitics.gatech.edu/api/admin/joinReq.php?ref=' . $ref . '&orgId=' . $orgId . '&userId=' . $userId,
        'context' =>array()
      );
      return Email::send($emailParams);
    } else {
      return false;
    }
  }
  public static function addPendingUser($userId, $orgId) {
    $eviticsDB = new DB('evitics');
    $sql = 'INSERT INTO `user` (`userId`, `orgId`, `writePerm`, `isPending`) VALUES (:userId, :orgId, 0, 1)';
    if(!$eviticsDB->query($sql, array('userId'=>$userId, 'orgId'=>$orgId))) {
      return false;
    } else {
      return true;
    }
  }
  public static function delUser($userId, $orgId) {
    //if one isn't requesting to delete oneself from an organization, and they don't have write perms. fail
    if($GLOBALS['USERNAME'] !== $userId && !User::hasWritePerms($orgId)) {
      return false;
    }
    $sql = "DELETE FROM `user` WHERE `userId` = :userId AND `orgId` = :orgId";
    $eviticsDB = new DB('evitics');
    if($eviticsDB->query($sql, array('userId'=>$userId, 'orgId'=>$orgId))) {
      return true;
    } else {
      return false;
    }

  }
  public static function addUser($userId, $orgId, $writePerm) {
    //make sure logged in user has permission to add ppl
    if(!User::hasWritePerms($orgId)) {
      return false;
    }
    $loggedInPerms = User::getPermissions($orgId);
    if(!$loggedInPerms['writePerm']) {
      return false;
    }

    $eviticsDB = new DB('evitics');
    $gted = new GTED();
    $userInfo = $gted->getUser($userId);
    if(!$userInfo || !isset($userInfo['gtprimarygtaccountusername']) || !isset($userInfo['gtprimarygtaccountusername'][0])) {

      return false;
    }

    //force userId to be a username...e.g. gburdell3
    $userId = $userInfo['gtprimarygtaccountusername'][0];
    //clean up any pending rows
    $delOldRows = 'DELETE FROM `user` WHERE `orgId` = :orgId AND `userId` = :userId';
    if(!$eviticsDB->query($delOldRows, array('orgId'=>$orgId, 'userId'=>$userId))) {
      return false;
    }

    //add new user row
    $addNewRow = 'INSERT INTO `user` (`userId`, `orgId`, `writePerm`, `isPending`) VALUES (:userId, :orgId, :writePerm, 0)';
    if($eviticsDB->query($addNewRow, array('writePerm'=>$writePerm, 'userId'=>$userId, 'orgId'=>$orgId))) {
      return true;
    } else {
      return false;
    }
  }
  public static function addPendingRequest($userId, $orgId) {
    $eviticsDB = new DB('evitics');
    $addPendingReqSQL = 'INSERT INTO `pendingRequests` (userId, orgId, referallCode) VALUES (:userId, :orgId, UUID())';
    $eviticsDB->query($addPendingReqSQL, array('userId'=>$userId, 'orgId'=>$orgId));
    
    $rowId = $eviticsDB->lastInsertId();
    $res = $eviticsDB->fetchAll("SELECT * FROM `pendingRequests` WHERE `id` = :id", array('id'=>$rowId));
    
    if($res && isset($res[0]) && isset($res[0]['referallCode'])) {
      return $res[0]['referallCode'];
    } else {
      return false;
    }
  }

  public static function hasRequestedJoin($userId, $orgId) {
    $eviticsDB = new DB("evitics");
    $sql = "SELECT count(*) as `numRows` FROM `user` WHERE `orgId` = :orgId AND `userId` = :userId";
    $res = $eviticsDB->fetchAll($sql, array('orgId'=>$orgId, 'userId'=>$userId));
    if(!$res || !isset($res[0])) {
      throw new Exception("Could not fetch user rows");
    }

    if($res[0]['numRows'] > 0) {
      return true; 
    } else {
      return false;
    }
  }
}


?>
