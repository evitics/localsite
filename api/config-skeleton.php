<?php
return array(
/*
  uncomment the following three lines if you want to 
  Go into debugging mode.  if uncommented, the logged in
  user is set to $this["development"]["username"].
*/
//    "development"=>array(
//      "username"=>"gburdell3",
//      "email" => "gburdell3@gatech.edu"
//    ),

//Database configuration
    "dbs" => array(
      "jacketpages" => array( //key is the database name
        "type"=> "mysql",
        "host" =>  "mysql.localhost", //mysql.localhost is for gt webhosting.
        "username"=> "****",
        "password"=> "****"
      ),
      "evitics" => array(
        "type"=> "mysql",
        "host" =>  "mysql.localhost",
        "username"=> "****",
        "password"=> "****"
      ),
      "checkin" => array(
        "type" => "mysql",
        "host" => "mysql.localhost",
        "username"=> "****",
        "password"=> "****"
      ),
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
      "rfidCardLength" => 9,
      "cache"=>array(
        "ttl"=>"30", //in days
        "database"=>"evitics", //database which stores the ldap cache
        "table"=>"gtedCache"   //table which stores the ldap cache
      )
    ),
    "jacketpagesURL"=> "http://jacketpages.gatech.edu",
    "adminUserAccounts"=> array(
	'gburdell3', 'gburdell69'
    )
);

?>
