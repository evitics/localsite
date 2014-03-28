<?php

$app->get('/user/:id', function($id) { User::get($id); });

//require "routes/User.php";
$app->get('/user/:id', function($id){ User::get($id); });
$app->get('/organizations', function() { Organization::getAll(); });
$app->get('/organizations/:id', function($id) { Organization::get($id); });
$app->post('/organizations/join/:id', function($id) { Organization::join($id); });
$app->post('/organizations/memberPermission/:id', function($id) { User::permissions($id); });

//Gets the current checkins
$app->get('/checkin/:orgId/:meetingId', function($orgId, $meetingId) {
    $checkin = new Checkin();
    $output = array(
        "checkins" => array(),
        "statistics" => array()
    );
   
    //Get list of records
    $records= $checkin->getRecords($orgId, $meetingId, 25);
    if($records) {
        array_push($output["checkins"], $records);
    }

    //Get statistics on event
    $statistics = $checkin->getStaistics($orgId, $meetingId);
    if($statistics) {
        array_push($output["statistics"], $statistics);  
    }
    echo json_encode($statistics);
});

$app->post('/checkin/:orgId/:meetingId/:userId', function($orgId, $meetingId, $userId) {
    $checkin = new Checkin();
    $output = array(
        "checkins" => array(),
        "statistics" => array()
    );
    //checkin user
    if(!$checkin->guest($orgId, $meetingId, $userId)) { //error
        array_push($output["checkins"],  array("invalid"=>true, "id"=>$userId));
    }

    //Get list of records
    $records= $checkin->getRecords($orgId, $meetingId, 25);
    if($records) {
        array_push($output["checkins"], $records);
    }

    //Get statistics on event
    $statistics = $checkin->getStaistics($orgId, $meetingId);
    if($statistics) {
        array_push($output["statistics"], $statistics);  
    }
    echo json_encode($statistics);

});

$app->get('/log/:orgId/:meetingId/all', function($orgId, $meetingId) {

});

$app->get('/log/:orgId/:meetingId', function($orgId, $meetingId) { 

});

$app->get('/log/:orgId/:meetingId/:yyyy', function($orgId, $meetingId, $year) {

});

$app->get('/log/:orgId/:meetingId/:yyyy/:mm', function($orgId, $meetingId, $year, $month) {

});


$app->notFound(function () use ($app) {
   echo '{ "error" : "invalid API call"}';
});
?>
