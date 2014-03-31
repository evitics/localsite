<?php

//TEST GTED
function testGTED() {
  try {
    require("./library/GTED.php");
    $gted = new GTED();
    assert($gted->padWithZeros("323125", 9) === "000323125");

    $gtIdQuery = array(
      "gtgtid"=>902532085,
      "from"=>0,
      "maxSize"=>1
    );
    $gtUsernameQuery = array(
      "gtprimarygtaccountusername"=>"cbookman3",
    );
    $gtAccessCardQuery = array(
      "gtaccesscardnumber"=>"000378127" //The unstructured query must have padding 0s...as its a 'dumb' method
    );
    $gtAccessCardQuery2 = array(
      "gtaccesscardnumber"=> $gted->padWithZeros("378127",9) //could also run like this
    );
    //var_dump($gted->query($gtUsernameQuery)[0]["gtprimarygtaccountusername"][0]);   
    
    /*===========================
      THESE TESTS DO NOT HIT THE GTED CACHE!!!, please refrain from using it in production code.
    =============================*/
    assert($gted->query($gtIdQuery)[0]["gtprimarygtaccountusername"][0]==="cbookman3");
    assert($gted->query($gtUsernameQuery)[0]["gtprimarygtaccountusername"][0]==="cbookman3");
    assert($gted->query($gtAccessCardQuery)[0]["gtprimarygtaccountusername"][0]==="cbookman3");
    assert($gted->query($gtAccessCardQuery2)[0]["gtprimarygtaccountusername"][0]==="cbookman3");
  
    assert($gted->queryGTUsername("cbookman3")["gtprimarygtaccountusername"][0]==="cbookman3");
    assert($gted->queryGTID("902532085")["gtprimarygtaccountusername"][0]==="cbookman3");

    //NOTICE that the buzzcard does not have the padding 0's in this test case, normal query would fail!
    assert($gted->queryBuzzCard("378127")["gtprimarygtaccountusername"][0]==="cbookman3");

    /*==========================
      USE THESES AS THEY **DO** HIT THE GTED CACHE,
    ===========================*/
    assert($gted->getUser("cbookman3")["gtprimarygtaccountusername"][0] === "cbookman3");
    assert($gted->getUser("902532085")["gtprimarygtaccountusername"][0] === "cbookman3");
    assert($gted->getUser("378127")["gtprimarygtaccountusername"][0] === "cbookman3");
    //bad userId example
    assert($gted->getUser(false) === false);
    return true;
  } catch(Exception $e) {
    echo "GTED Failed tests: " . $e;
    return false;
  }
}
?>
