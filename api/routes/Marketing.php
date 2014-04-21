<?php   
require_once('./library/Email.php');
require_once('./library/DB.php');
require_once('./library/GTED.php');
require_once('./library/Helpers.php');
require_once('./routes/Meeting.php');
require_once('./routes/Organization.php');

Class Marketing {
  public static function sendEmails($POST) {
    /* check for required params */
    $requiredParams = array( 'orgId', 'meetingId', 'to', 'from', 'subject', 'message' );
    foreach($requiredParams as $param) {
      if(empty($POST[$param])) {
        return array('error'=>$param . ' is a required param');
      }
    }

    /* sanatize orgId */
    $orgId = Helpers::id2Int($POST['orgId']);

    /* Get email Context */
    $organization = self::organizationContext($POST['orgId']);
    if(!$organization) {   return array('error'=>'Could not fetch organization'); }
    
    $meeting;
    /* Get Meeting Context, only if set */
    if(strtolower($POST['meetingId']) == 'all') {
      $POST['meetingId'] = '%'; //convert 'all' to %
      $meeting = array(); //empty as we're dealing with 'all' meetings
    } else {
      $meeting = self::meetingContext($POST['meetingId']);
      if(!$meeting) { return array('error'=>'Could not fetch meeting'); }
    }

    /* get list of email recipients */
    $checkinDB = new DB('checkin');
    $sql = "SELECT DISTINCT `userId` FROM `$orgId` WHERE `meetingId` LIKE :meetingId";
    $guestRows = $checkinDB->fetchAll($sql, array("meetingId"=>$POST['meetingId']));

    if(!$guestRows) {
      return array('error'=>'Could not fetch checkin data, no emails sent');
    }
    $context = array(
      "meeting"=>$meeting,
      "organization"=>$organization,
      "guest"=>null
    );
    $emailParams = array(
      "to" => $POST['to'],
      "from" => $POST['from'],
      "subject" => $POST['subject'],
      "message" => $POST['message'],
      "context" => array()
    );
    /* start sending dem emails */
    $emailCount = 0;
    $gted = new GTED();
    $errors = array();
    foreach($guestRows as $guestRow) {
      $userInfo = $gted->getUser($guestRow['userId']);
      if($userInfo) {
        $context['guest'] = $gted->saneitize($userInfo);
        $emailParams['context'] = $context;
        $emailStatus = Email::send($emailParams);
        if(isset($emailStatus['error'])) {
          array_push($errors, $emailStatus['error']);
        } else {
          ++$emailCount;
        }
      }
    }
    if(count($errors) > 0) {
      return array('error' => $errors);
    } else {
      return array('status'=>"Sent " . $emailCount . " emails");
    }
  }
  public static function organizationContext($orgId) {
    return Organization::saneitize(Organization::get($orgId));
  }
  public static function meetingContext($meetingId) {
    return Meeting::saneitize(Meeting::get($POST['meetingId']));
  }
}
  
