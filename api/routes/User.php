<?php
require("./library/DB.php");
require("./library/GTED.php");
$gted = new GTED();
$db = new DB("evitics");
$db2 = new DB("jacketpages");
class User {
  public static function get($id) {
	try {
	$query = "SELECT * FROM 'user' LEFT OUTER JOIN 'organizations' ON user.orgId = organizations.orgId WHERE 'userId'=:userId";	
	$result = $db->fetchAll($query, array("userId"=>$id));
	echo json_encode($result);
    }
  public static function permissions($id) {
    echo "Changing permissions for: $id";
  }
}

?>
