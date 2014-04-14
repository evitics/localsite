##Log.php##
###Includes###
  ./library/DB.php

###public###
  * static create($params)
    -$params is an array:
      * required: 'name', 'orgId', 'emailTo', 'emailFrom', 'emailSubject', 'emailMessage'
      * optional: 'meetingId'
    - returns the created meeting as an array, or returns array('error'=>...error message..) if something went wrong.
  * static delete($orgId, $meetingId)
    -Deletes the specified meeting.
    -returns an array:
      -array('status'=>'successful')
      -array('error'=>'could not delete..')
      -array('error'=>'you don't have permissions to delete....')
  * get($orgId, $meetingId)
    -alais to getMeetId
  * get($orgId)
    -alais to getOrgId
  * getMeetId($orgId, $meetingId) 
    -Returns the meeting Obj, or a false
  * getOrgId($orgId)
    -Returns all meetings for the orgId, or a false
  * saneitize($meetingObj)
    -Returns the meeting object with sane name fields that end user can understand for his/her email templates.  It does not include the raw emailTo, emailFrom, emailSubject, or emailMessage fields.

