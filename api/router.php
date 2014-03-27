<?php

$app->get('/user/:id', function($id) { User::get($id); });

$app->get('/organizations', function() { Organization::getAll(); });
$app->get('/organization/:id', function($id) { Organization::get($id); });
$app->post('/organization/join/:id', function($id) { Organization::join($id); });

$app->post('/organization/memberPermission/:id', function($id) { User::permissions($id); });

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
   
// $app->post('/checkin/:orgId/:meetingId/:userId', function($orgId, $meetingId, $userId) {
//   //Sample Output...also puts in a bad query (should always be @ top)
//   echo '
//   {
//     "checkins" : [
//         {
//          "id" : "'.$userId.'",
//          "major" : "CMPE",
//          "email" : "cbookman@gatech.edu", 
//          "affiliation" : "student",
//          "name" : {
//             "first" : "Colin",
//             "middle" : "Paul",
//             "last" : "Bookman",
//             "full" : "'.$userId.'"
//          },
//          "checkinTime" : "2014-03-27T15:20:51.869Z",
//          "isNew" : false
//         },
//         {
//          "id" : "cbookman3",
//          "major" : "CMPE",
//          "email" : "cbookman@gatech.edu", 
//          "affiliation" : "student",
//          "name" : {
//             "first" : "Colin",
//             "middle" : "Paul",
//             "last" : "Bookman",
//             "full" : "Bookman, Colin Paul"
//          },
//          "checkinTime" : "2014-03-27T15:20:51.869Z",
//          "isNew" : true
//         },
//         { "id" : "gburdell3",
//          "major" : "CMPE",
//          "email" : "cbookman@gatech.edu", 
//          "affiliation" : "student",
//          "name" : {
//             "first" : "Colin",
//             "middle" : "Paul",
//             "last" : "Bookman",
//             "full" : "Bookman, Colin Paul"
//          },
//          "checkinTime" : "2014-03-27T15:20:22.578Z",
//          "isNew" : false
//         }
//     ],
//     "statistics" : {
//         "attendance" : 53,
//         "rate"  : 2,
//         "newMembers" : 4
//     }
//   }';
// });
$app->notFound(function () use ($app) {
   echo '{ "error" : "invalid API call"}';
});
?>
