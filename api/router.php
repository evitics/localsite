<?php

$app->get('/user/:id', function($id) { 
    $userInfo = $User::get($id);
    if($userInfo) {
        echo json_encode($userInfo);
    } else {
        echo '{"error" : "could not fetch user info"}';
    }
});
$app->get('/organizations', function() { 
    $orgs = Organization::getAll();
    if($orgs) {
        echo json_encode($orgs);
    } else {
        echo '{"error" : "could not fetch the organizations"}';
    }
});
$app->get('/organizations/:id', function($id) { 
    $org = Organization::get($id);
    if($org) {
        echo json_encode($org);
    } else {
        echo '{"error" : "could not fetch org with id"'.$id.'"}';
    }
});
$app->get('/meetings/:orgId/:meetingId', function($orgId, $meetingId) { 
	$meeting = MeetingRoutes::getMeetId($orgId, $meetingId); 
	if($meeting) {
		echo json_encode($meeting);
	} else {
		echo '{"error" : "could not fetch meeting with orgId: '.$orgId.' and meetingId: '.$meetingId.'"}';
	}
});
$app->get('/meetings/:orgId/', function($orgId) {
    $org = MeetingRoutes::getOrgId($orgId); 
	if($org) {
		echo json_encode($org);
	} else {
		echo '{"error" : "could not fetch meetings for orgId: '.$orgId.'"}';
	}
});

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
