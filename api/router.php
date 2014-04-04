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

$app->get('/gted/:userId', function($userId) {
    require_once("./library/GTED.php");
    $gted = new GTED();
    $userLDAPObj = $gted->getUser($userId);
    if(!$userLDAPObj) {
        $userLDAPObj = array("error"=> "invalid userId");
    } else {
        //We don't want to show these...security issues
        unset($userLDAPObj["gtaccesscardnumber"]);
        unset($userLDAPObj["gtgtid"]);
    }
    echo json_encode($userLDAPObj);
});

$app->notFound(function () use ($app) {
    throw new Exception("Invalid api call");
});
?>
