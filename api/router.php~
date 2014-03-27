<?php include(config.php)

//require "routes/User.php";
$app->get('/user/:id', function($id){ User::get($id); });
$app->get('/organizations', function() { Organization::getAll(); });
$app->get('/organization/:id', function($id) { Organization::get($id); });
$app->post('/organization/join/:id', function($id) { Organization::join($id); });
$app->post('/organization/memberPermission/:id', function($id) { User::permissions($id); });
$app-delete({});
$app->notFound(function () use ($app) {
   echo '{ "error" : "invalid API call"}';
});
?>
