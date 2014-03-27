<?php
//Make sure user is logged in
$_ENV["REMOTE_USER"] = "cbookman3"; //remove when not testing

if(empty($_ENV["REMOTE_USER"])) {
  echo '{"error" : "not logged in"}'; 
  return;
  throw new Error("User Not Logged In");

} else {
  $GLOBALS["USERNAME"] = $_ENV["REMOTE_USER"];//$_ENV["REMOTE_USER"];
}


//Instatiate the SLIM framework
require 'vendor/autoload.php';
$app = new \Slim\Slim();

//Change the http Content-type header to json
$response = $app->response();
$response['Content-Type'] = "application/json; charset=utf-8";
//Internal string encoding is utf-8
mb_internal_encoding("UTF-8"); 

//Load only the needed controllers 
spl_autoload_register(function ($class_name) {
    $file = 'routes/' . $class_name. '.php';
    if (file_exists($file)) {
        require_once($file);
    }
});
//Binds our routes
require "./router.php";




$app->run();
?>
