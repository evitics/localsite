<?php
return array(
    "dbs" => array(
      "databaseName" => array(
        "type" => "mysql",
        "host" => "localhost",
        "username" =>"*****",
        "password" => "*****"
      )
    ),
    /*
      Configuration for the local site's ldap directory
    */
    "ldap" => array(
      "host" => "ldaps://r.gted.gatech.edu",
      "port" => 636,
      "rdn"=>"uid=evitics_dev,ou=local accounts,dc=gted,dc=gatech,dc=edu",
      "tree"=> "ou=people,dc=gted,dc=gatech,dc=edu",
      "password" => "**********",
      "rfidCardLength" => 9
    )
);
?>
