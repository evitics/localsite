<?php
  assert_options(ASSERT_BAIL, 1); //force php to end script if assert fail
  echo "Starting Tests\n";
  //TEST GTED
  require("./tests/GTED.php");
  if(testGTED()) {
    echo "\t-GTED Passed Tests\n";
  } else {
    echo "\t-GTED FAILED TESTS!, make sure you're on gatech's wifis/vpn\n";
  } 
  //TEST DB
  require("./tests/DB.php");
  if(testDB()) {
    echo "\t-DB Passed Tests\n";
  } else {
    echo "\t-DB FAILED TESTS!\n";
  }

  require("./tests/Helpers.php");
  if(testHelpers()) {
    echo "\t-Helpers Passed Tests\n";
  } else {
    echo "\t-Helpers FAILED TESTS!\n";
  }
  echo "Ending Tests\n";
?>
