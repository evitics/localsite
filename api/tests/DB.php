<?php
function testDB() {
  try {
    require_once("./library/DB.php");
    $db = new DB("evitics");
    //Run a query which should return all users FYI, and count the number of 'rows' in the return obj
    assert(count($db->fetchAll("SELECT * FROM `user` where `userId` LIKE :userId", array("userId"=>"%"))) >= 1);
    //In the last query, how may rows did it have (much faster to do it this way.
    assert($db->currentQuery->rowCount() >= 1);
    
    //If you want to fetch the database results row by row...for w/e reason you'd do the following
    $db->query("SELECT * FROM `user` where `userId` LIKE :userId", array("userId"=>"%"));
    assert($db->nextRow());
    
    //You may also do it this way as well
    $res = $db->query("SELECT * FROM `user` where `userId` LIKE :userId", array("userId"=>"%"));
    assert($res->fetch());

    //If you run a query with 0 results results you'll get a false...e.g:
    $res = $db->fetchAll("SELECT * FROM `user` where `userId` = :userId", array("userId"=>-1));
    assert($res === false);

    /*
      Same thing happens when running a query
      with 0 results with the  nextRow() method.
      Do realize that you'll also get a false when hitting the last result
    */
    $db->query("SELECT * FROM `user` where `userId` = :userId", array("userId"=>-1));
    assert($db->nextRow() === false);
    return true;
  } catch(Exception $e) {
    echo "DB Failed tests: " . $e;
    return false;
  }
}
?>
