<?php
return [
 "dbs" => [
 "jacketpages" =>[
  "host" => "localhost",
  "username" => "evitics", 
  "password"=> "eventanalytics",
  "type"=> "mysql"
  ]
 "evitics" => [
  "host" => "localhost",
  "username" => "evitics", 
  "password" => "eventanalytics",
  "type":"mysql"
  ]
  "localsite" => [
  "host" => "localhost",
  "username" => "localsite", 
  "password" => "eventanalytics",
  "type" => "mysql"
  ]
 "ldap" =>[
  "host" => "ldaps://r.gted.gatech.edu",
  "port"=>636,
  "rdn" => "uid=evitivs_dev,ou=local accounts,dc=gted,dc=gatech,dc=edu",
  "tree" => "ou=people,dc=gted,dc=gatech,dc=edu",
  "password" =>"Eventanalytics2014",
  "rfidCardLength" =>9
];
?>
