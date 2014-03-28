<?php

class Helpers {
  public static function orgId2Int($orgId) {
    if(is_nan($orgId)) {
      throw new Error("OrgId is not a number: " . $orgId); return;
    }
    return intval($orgId);
  }
}

?>