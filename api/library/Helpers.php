<?php

class Helpers {
  public static function id2Int($id) {
    if(is_nan($id)) {
      throw new Exception("Id is not a number: " . $id); return;
    }
    return intval($id);
  }
}

?>