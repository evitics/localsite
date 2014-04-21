##Log.php##

###Includes###
./library/Helpers.php
./Library/DB.php

###Private###
  * $checkinDb = database link to the checkin tables

###Public###
  *__construct()
    -Attaches the checkin DB to $this->checkinDb
  * getAll($params)
    -returns a raw log of checkins as a CSV string.
    -$params is an array:
      * Required: orgId, meetingId.
      * Optional: year, month, day
  * getOverview($params)
    -returns an array containing the totals for year->month->day (aka flat pivot table). Array in tree format of: $output[yyyy][MonthName][day].  there is a day called 'total' which contains the total for the month.
    -$params = array('orgId=>....','meetingId'=>....)