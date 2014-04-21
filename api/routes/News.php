<?php   
require_once("./library/Helpers.php");
require_once("./library/DB.php");
require_once("./routes/Organization.php");
Class News {
  public function __construct() {    
    $this->checkinDB = new DB('checkin');
  }
  public function get($orgId) {
    $orgId = Helpers::id2Int($orgId);
    $oneMonthAgoTotalSQL = "SELECT count(*) as `total` FROM `$orgId` WHERE `timestamp` BETWEEN (NOW() - INTERVAL 1 MONTH) AND (NOW() - INTERVAL 2 MONTH)";
    $twoMonthAgoTotalSQL = "SELECT count(*) as `total` FROM `$orgId` WHERE `timestamp` BETWEEN (NOW() - INTERVAL 2 MONTH) AND (NOW() - INTERVAL 3 MONTH)";
    $oneMonthAgoTotal = $this->checkinDB->fetchAll($oneMonthAgoTotalSQL, array());
    $twoMonthAgoTotal = $this->checkinDB->fetchAll($twoMonthAgoTotalSQL, array());
    if($oneMonthAgoTotal && isset($oneMonthAgoTotal[0]) && $twoMonthAgoTotal && isset($twoMonthAgoTotal[0]) ) {
      return $twoMonthAgoTotal[0]['total'] - $oneMonthAgoTotal[0]['total'];
    } else {
      return 0;
    }
  }
 
}

?>
