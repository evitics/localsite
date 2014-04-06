<?php
/* 
    Get your user information
*/
$app->get('/user', function() {
    $userInfo = User::get($GLOBALS["USERNAME"]);
    if($userInfo) {
        echo json_encode($userInfo);
    } else {
        throw new Exception("Could not fetch user info");
    }
});
/*
    Put in a request to join an organization
*/
$app->post('/organization/join/:id', function($orgId) {
    echo json_encode(Organization::join($orgId));
});
/*
    Get list of organizations
*/
$app->get('/organizations', function() { 
    $orgs = Organization::getAll();
    if($orgs) {
        echo json_encode($orgs);
    } else {
        throw new Exception("Could not fetch all of the organizations");
    }
});
/*
    Get organization's information
*/
$app->get('/organizations/:id', function($id) { 
    $org = Organization::get($id);
    if($org) {
        echo json_encode($org);
    } else {
        throw new Exception("Could not fetch org with id: $id");
    }
});
/*
    Get meeting's information
*/
$app->get('/meeting/:orgId/:meetingId', function($orgId, $meetingId) { 
	$meeting = Meeting::getMeetId($orgId, $meetingId); 
	if($meeting) {
		echo json_encode($meeting);
	} else {
        throw new Exception("Could not fetch the meeting with orgId: $orgId, and meetingId: $meetingId");
	}
});
/*
    Get meetings for said organization
*/
$app->get('/meeting/:orgId(/)', function($orgId) {
    $org = Meeting::getOrgId($orgId); 
	if($org) {
		echo json_encode($org);
	} else {
        throw new Exception("Could not fetch meetings for orgId: $orgId");
	}
});
/*
    Create new meeting
*/
$app->post('/meeting/:orgId', function($orgId) {
    if(!isset($_POST['name'])) {
        echo '{ "error" : "Meeting Name not specified" }'; return;
    }
    $params = array(
        'orgId'=>$orgId,
        'name' => $_POST['name']
    );
    if(isset($_POST['onCheckIn'])) {
        $params['onCheckIn'] = $_POST['onCheckIn'];
    }
    echo json_encode(Meeting::create($params));
});
/*
    Update meeting's info
*/
$app->put('/meeting/:orgId/:meetingId', function($orgId, $meetingId) {
    if(!isset($_POST['name'])) {
        echo '{ "error" : "Meeting Name not specified'.$_POST['name'].'"  }'; return;
    }
    $params = array(
        'orgId'=>$orgId,
        'meetingId'=>$meetingId,
        'name' => $_POST['name']
    );
    if(isset($_POST['onCheckIn'])) {
        $params['onCheckIn'] = $_POST['onCheckIn'];
    }
    echo json_encode(Meeting::create($params));
});
/*
    Remove specified meeting
*/
$app->delete('/meeting/:orgId/:meetingId', function($orgId, $meetingId) {
    echo json_encode(Meeting::delete($orgId, $meetingId));
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
$app->post('/mail', function() {
    $requiredParams = array('from', 'to', 'subject', 'message');
    foreach($requiredParams as $requiredParam) {
        if(empty($_POST[$requiredParam])){
            echo '{"error" : "Missing a required param (from, to, subject, and message are required)" }';
            return;
        } 
    }
    //turn array of $_POST['to'], to proper form
    if(is_array($_POST['to'])) { $_POST['to'] = implode(',', $_POST['to']); }
    //Gen PHP Headers
    $headers = 'From: ' . $_POST['from'] . "\r\n" .
               'Reply-To: ' . $_POST['from'] . "\r\n" .
               'X-Mailer: PHP/' . phpversion();
    //attempt to send mail
    if(mail($_POST['to'], $_POST['subject'], $_POST['message'], $headers)) {
        echo '{ "success" : "email sent"}';
    } else {
        echo '{ "error" : "email could not be sent" }';
    }
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
