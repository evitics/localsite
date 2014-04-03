<?php

$app->get('/user', function() {
    $userInfo = User::get($GLOBALS["USERNAME"]);
    if($userInfo) {
        echo json_encode($userInfo);
    } else {
        throw new Exception("Could not fetch user info");
    }
});
$app->get('/organizations', function() { 
    $orgs = Organization::getAll();
    if($orgs) {
        echo json_encode($orgs);
    } else {
        throw new Exception("Could not fetch all of the organizations");
    }
});
$app->get('/organizations/:id', function($id) { 
    $org = Organization::get($id);
    if($org) {
        echo json_encode($org);
    } else {
        throw new Exception("Could not fetch org with id: $id");
    }
});
$app->get('/meetings/:orgId/:meetingId', function($orgId, $meetingId) { 
	$meeting = Meeting::getMeetId($orgId, $meetingId); 
	if($meeting) {
		echo json_encode($meeting);
	} else {
        throw new Exception("Could not fetch the meeting with orgId: $orgId, and meetingId: $meetingId");
	}
});
$app->get('/meetings/:orgId(/)', function($orgId) {
    $org = Meeting::getOrgId($orgId); 
	if($org) {
		echo json_encode($org);
	} else {
        throw new Exception("Could not fetch meetings for orgId: $orgId");
	}
});
//Creation
$app->put('/meeting/:orgId', function($orgId){
		
});

//Modification
$app->post('/meeting/:org/:meetingID', function($org, $meetingID){
	
});
//Deletion
$app->delete('/meeting/:orgID/:meetingID', function($orgID, $meetingID){
	$result = MeetingRoutes::delMeet($ordID, $meetingID);
	if($result == false){
		echo '{"error" : "could not delete meeting"}';
	}
});

//Gets the current checkins
$app->get('/checkin/:orgId/:meetingId(/)', function($orgId, $meetingId) {
    $checkin = new Checkin();
    $output = array(
        "checkins" => array(),
        "statistics" => array()
    );
    
    //Get list of records
    $records= $checkin->getRecords($orgId, $meetingId, 25);
    if($records) {
        $output["checkins"]= array_merge($output["checkins"], $records);
    }

    //Get statistics on event
    $statistics = $checkin->getStaistics($orgId, $meetingId);
    if($statistics) {
        $output["statistics"] = $statistics;
    }

    echo json_encode($output);
});

$app->post('/checkin/:orgId/:meetingId/:userId', function($orgId, $meetingId, $userId) {
    $checkin = new Checkin();
    $output = array(
        "res" => array(),
        "checkins" => array(),
        "statistics" => array()
    );
    //checkin user, and attach result to the 'message' property
    $output["res"]=$checkin->guest($orgId, $meetingId, $userId);


    //Get list of records
    $records = $checkin->getRecords($orgId, $meetingId, 25);
    if($records) {
        $output["checkins"]= array_merge($output["checkins"], $records);
    }
    
    //Get statistics on event
    $statistics = $checkin->getStaistics($orgId, $meetingId);
    if($statistics) {
        $output["statistics"] = $statistics;  
    }

    echo json_encode($output);

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
    throw new Exception("Invalid api call");
});
?>
