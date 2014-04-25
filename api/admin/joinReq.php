<!--
    This code is not pretty, nor is it ment to be.
    Its a simple stupid form. nothing more
    ....in fact its super fucking ugly. But its functional, 
    and was made in < 1 hour.
-->
<html>
<head>
</head>
<body>
<?php
  /*
    Perform checks on URL parameters
  */
  require_once('../library/DB.php');
  require_once('../routes/Organization.php');
  //check that all required params are set
  if(!isset($_GET['orgId']) || !isset($_GET['userId']) || !isset($_GET['ref'])) {
    die("Invalid url");
  }

  //check that the orgId, userId, ref combo is accurate
  $eviticsDB = new DB('evitics');
  $sql = 'SELECT COUNT(*) as `rowCount` FROM `pendingRequests` WHERE `userId` = :userId AND `orgId` = :orgId AND `referallCode` = :ref';
  $res = $eviticsDB->fetchAll($sql, array(
      'userId'=>$_GET['userId'],
      'orgId'=>$_GET['orgId'],
      'ref'=>$_GET['ref']
  ));
  if(!$res || !isset($res[0]) || !isset($res[0]['rowCount']) || $res[0]['rowCount'] != 1) {
    die("Invalid url");
  }

  /*
    Get organization's information
  */
  $org = Organization::get($_GET['orgId']);
  $orgName = $_GET['orgId'];
  if(!empty($org['name'])) {
    $orgName = $org['name'];
  } else if(!empty($org['short_name'])) {
    $orgName = $org['short_name'];
  }
  $actions = array(
    'add'=>'Add user to organization',
    'disregard' => 'Disregard Request'
  );

  //Check if form self posted
  if(isset($_POST['writePerm']) && isset($_POST['action'])) {
    $deleteRequest = "DELETE FROM `pendingRequests` WHERE `userId` = :userId AND `orgId`=:orgId AND `referallCode` = :ref ;";
    $sqlParams = array('orgId'=>$_GET['orgId'], 'userId'=>$_GET['userId'], 'ref'=>$_GET['ref']);
    $res = $eviticsDB->query($deleteRequest, $sqlParams);
    if(!$res) { die("Could not fufill request, please contact admin"); }

    if($_POST['action'] === $actions['add']) {
      $addUser = "UPDATE `user` SET `isPending` = 0, `writePerm` = :writePerm WHERE `userId` = :userId AND `orgId` = :orgId ;";
      $res = $eviticsDB->query($addUser, array('writePerm'=>$_POST['writePerm'], 'userId'=>$_GET['userId'], 'orgId'=>$_GET['orgId']));
      if($res) {
        echo "Successfully added user";
      } else {
        echo "Could not disregard request, please contact admin";
      }
    } else if($_POST['action'] === $actions['disregard']) {
      $remUser = "DELETE FROM `user` WHERE `userId` = :userId AND `orgId` = :orgId ;";
      $res = $eviticsDB->query($remUser, array('userId'=>$_GET['userId'], 'orgId'=>$_GET['orgId']));
      if($res) {
        echo "Successfully disregarded request";
      } else {
        echo "Could not disregard request, please contact admin";
      }
    } else {
      die("Invalid form response");
    }
  //Form not self posted, display our form
  } else {
    echo '<h3>Approve or Deny join request</h3>';
    echo '<h4>User: ' . $_GET['userId'] . '</h4>';
    echo '<h4>Organization: ' . $orgName . '</h4>';
    echo '<form method="POST">';
    echo 'Grant Write Permissions:';
    echo '   <label><input type="radio" name="writePerm" value="0" checked>No</label>';
    echo '   <label><input type="radio" name="writePerm" value="1">Yes</label><br>';
    echo '<br>';
    echo '<input type="submit" name="action" value="Add user to organization" style="font-size:1.3rem"><br><br>';
    echo '<input type="submit" name="action" value="Disregard Request" style="font-size:1.3rem;">';
  }
?>
</body>
</html>
