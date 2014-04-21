<?php   
require_once("./library/Helpers.php");
require_once("./library/DB.php");
require_once("./routes/Organization.php");
Class Log {
  private $checkinDb;
  
  public function __construct($orgId) {    
    $this->checkinDb = new DB("checkin");
    $this->orgId = Helpers::id2Int($orgId);
    Organization::createCheckinTable($orgId); //creates checkin table if not exists
  }
  /*
    Get the raw log:
      required: orgId, meetingId
      optional: year, month, day
  */
  public function getAll($params) {
    //sanatize orgId
    $meetings = Meeting::get($this->orgId);
    
    //build query based on optional parameters
    $sql = "SELECT `userId`, `meetingId`, `timestamp`, `checkedInBy` FROM `$this->orgId` WHERE `meetingId` LIKE :meetingId";
    $queryParams = array('meetingId'=>'%');

    //if the user specifies a meetingId
    if(isset($params['meetingId'])) {
      $queryParams['meetingId'] = $params['meetingId'];     
    } 
    //if the user specifies year
    if(isset($params['year'])) { 
      $sql .= ' AND YEAR(`timestamp`) = :year';
      $queryParams['year'] = $params['year'];
    }
    
    //if the user specifies month
    if(isset($params["month"])) { 
      $sql .= ' AND MONTHNAME(`timestamp`) = :month';
      $queryParams['month'] = $params['month'];
    }
    
    //if the user specifies day
    if(isset($params['day'])) { 
      $sql .= ' AND DAY(`timestamp`) = :day';
      $queryParams['day'] = $params['day'];
    }
    $rows = $this->checkinDb->fetchAll($sql,$queryParams, PDO::FETCH_NUM);
    
    if(!$rows) { return 'no data'; }

    $csv = "'userId', 'meeting', 'timestamp', 'checkedInBy'" . "\r\n";
    foreach($rows as $row) {
      //convert meetingId to meetingName
      foreach($meetings as $meeting) {
        if($row[1] === $meeting['meetingId']) {
          $row[1] = $meeting['name'];
          break;
        }
      }
      
      $csv .= "'$row[0]',  '$row[1]', '$row[2]', '$row[3]'" . "\r\n";
    }
    return $csv;
  }
  /*
    Totals for a Year->month->day combo
  */
  public function getOverview($params) {
    if(!isset($params['meetingId'])) {
      throw new Exception('meetingId is a required param');
    }

    $meetingId = $params['meetingId'];
    $sql = "SELECT
              YEAR(`timestamp`) as `year`, 
              MONTHNAME(`timestamp`) as `month`, 
              DAYOFMONTH(`timestamp`) as `day`, 
              COUNT(*) as `total` 
            FROM 
              `$this->orgId` WHERE `meetingId` = :meetingId
               GROUP BY `year`, `month`, `day`";
    //grab the overview of all attendance counts and group by year, month, day
    $results = $this->checkinDb->fetchAll($sql, array("meetingId"=>$meetingId));
    if(!$results) {
      return array("error"=>"could not get overview for orgId: " . $this->orgId . " for meeting: " . $meetingId);
    }
    //order data for display in the pivot table
    $output = array();
    foreach($results as $result) {
      $year   = $result["year"];
      $month  = $result["month"];
      $day    = $result["day"];
      $total  = $result["total"];
      $output[$year][$month][$day] = $total;
      //monthly total
      if(!isset($output[$year][$month]['total'])) {
        $output[$year][$month]['total'] = $total;
      }  else {
        $output[$year][$month]['total'] += $total;
      }
    }
    return $output;
  }
}

?>
