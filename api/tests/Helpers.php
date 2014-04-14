<?php
function testHelpers() {
  //check that buzzcard successfully parsed out
  assert(Helpers::parseRawBuzzCard(756254) === 378127);

  //check that exception is thrown for invalid id
  $exceptionThrown = false;
  try {
    Helpers::id2Int('this should throw an exception');
  } catch(Exception $e) {
    $exceptionThrown = true;
  }
  assert($exceptionThrown === true);
  
  //check that exception is thrown for negative numbers
  $exceptionThrown = false;
  try {
    Helpers::id2Int(-1);
  } catch (Exception $e) {
    $exceptionThrown = true;
  }

  assert($exceptionThrown === true);
  
  for($i = 0; $i < 250; ++$i) {
    assert(Helpers::id2Int($i) === $i);
  }
  return true;
}

?>
