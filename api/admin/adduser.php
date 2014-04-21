<?php
  /*
    DO NOT JUDGE THIS CODE, ITS A POS made in < 3 mins.  I do realize
    that its ugly....but its ment only as a quick interface to MySQL.
  */
  require_once('../routes/Organization.php');
  require_once('../library/GTED.php');
  require_once('../library/DB.php'); 
  $config = require('../config.php');
  $eviticsDB = new DB("evitics");
  $gted = new GTED();
  $organizations = Organization::getAll();
  if(!in_array($_ENV["REMOTE_USER"], $config['adminUserAccounts'])) {
    die("Not authorized");
  }
?>
<html>
<head>
</head>
<body>
  <?php
    //super shitty code written to make a quick sql interface
    if(!empty($_POST['orgId']) && !empty($_POST['userId'])) {
      $orgId = $_POST['orgId'];
      $userInfo = $gted->getUser($_POST['userId']);
      if($userInfo) {
        $userId = $userInfo['gtprimarygtaccountusername'][0];
        $writePerm = 0;
        if(!empty($_POST['writePerm'])) {
          $writePerm = intval($_POST['writePerm']);
        }
        $sql = "DELETE FROM `user` WHERE `userId` = :userId AND `orgId` = :orgId";
        if($eviticsDB->query($sql, array('userId'=>$userId, 'orgId'=>$orgId))) {
          $sql2 = 'INSERT INTO `user` (`userId`, `orgId`, `writePerm`, `isPending`) VALUES (:userId, :orgId, :writePerm, 0)';
          $res = $eviticsDB->query($sql2, array('userId'=>$userId, 'orgId'=>$orgId, 'writePerm'=>$writePerm));
          if($res) {
            echo "<h3>Inserted $userId into organization with id: $orgId</h3>";
          } else {
            echo "<h3>Could not insert $userId into organization with id: $orgId</h3>";
          }
        }
      } else {
        echo "Not a valid userId";
      }
    }
  ?>
  <form method="post">
    <label>Gatech Username: 
      <input name="userId" type="text">
    </label><br>
    <label>Organization:
      <select name="orgId">
        <?php
          foreach($organizations as $organization) {
            echo '<option value="' . $organization['orgId'] . '">'.$organization['short_name'] . ' - ' . $organization['name'] .'</option>';
          }
        ?>
      </select>
    </label><br>
    <label>Write Permissions
      <input type="checkbox" name="writePerm" value="1">
    </label><br>
    <input type="submit" value="Add User">
  </form>
</body>
</html>
