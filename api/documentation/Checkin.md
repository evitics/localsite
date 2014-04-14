##Checkin.php##

###Includes###
  ./library/DB.php
  ./library/GTED.php
  ./library/Helpers.php
  ./routes/Meeting.php
  ./routes/Organization.php
  ./library/Email.php

###Privates###
  * $gted
  $userDb
  -$checkinDb
  * checkInUser($orgId, $meetingId, $userId)
    -actually commit a user to be checked in
###Public###
  * construct()
    -attaches and connects to gted, userDb (`evitics`), and checkin.
  * getStatistics($orgId, $meetingId)
    -returns array("attendance"=>$attendance), $attendance contains the count of how many people checked in w/in the past 6 hours.
  * guest($orgId, $meetingId, $userId)
    -attempts to checkin the $userId into $orgId->$meetingId.
    -First checks to see if logged in user has permission to checkin the guest.  Next checks if guest has checked in < 6 hours ago.  Finally if both critera have been 'passed' it will checkin the user, and send any emails.
    -$userId can be a gtid, gtusername, or buzzcard code
    -returns array:
      -array("error"=>$errormsg)
        -userId is not valid
        -logged in user has insufficient privlages
        -exception thrown
      -array('success=>'success message') //guest checked in
      -array('warning'=>'warning message') //guest not checked in, due to him already checking in
  * getRecords($orgid, $meetingId, $number)
    -gets $number of most recent checkins.  
    -E.g: if $number = 25; it will return the 25 most recent checkins
  * isCHeckedIn($orgId, $meetingId, $userId) 
    -Returns a true if the specified $userId (in form of gatech username) has checked in < 6 hours ago, else returns false.
  * doesBelong2Org($userId, $orgId)
    - returns true if the user has an entry in `evitics`.`user` with the specified userId mapped to the orgId
    - Aka if the user belogns to the org returns a true
  * isNewUser($userId, $orgId, $meetingId) 
    -Returns true if the user has never checked into the specified meeting before
  * isNewUser($userId, $orgId)
    -Returns true if hte user has never checked into the organization before.
  * sendEmail($userId, $orgId, $meetingId)
    -$userId = a gtId, gtusername, or buzzcardId
    -sends an email using hte template specified in the meeting.  It will follow the rules of that meeting, so if sendEmailOnCheckin = false, no email is sent.  Or if sendEmailOnCheckin="new" it will check if the user is new to the organization.  If he is not new to the organization it will not send out the email.
    -Returns
      * false = something went wrong
      * -1 = sendEmailOnCheckin was false
      * true =sent an email successfully
      * 2 sendEmailOnCheckin was for new guests only, and guest was not new

