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
    //Example 'invalid userId' given
echo '
  {
    "checkins" : [
        {
         "id" : "cbookman3",
         "major" : "CMPE",
         "email" : "cbookman@gatech.edu", 
         "affiliation" : "student",
         "name" : {
            "first" : "Colin",
            "middle" : "Paul",
            "last" : "Bookman",
            "full" : "Bookman, Colin Paul"
         },
         "checkinTime" : "2014-03-27T15:20:51.869Z",
         "isNew" : true
        },
        { "id" : "gburdell3",
         "major" : "CMPE",
         "email" : "cbookman@gatech.edu", 
         "affiliation" : "student",
         "name" : {
            "first" : "Colin",
            "middle" : "Paul",
            "last" : "Bookman",
            "full" : "Bookman, Colin Paul"
         },
         "checkinTime" : "2014-03-27T15:20:22.578Z",
         "isNew" : false
        }
    ],
    "statistics" : {
        "attendance" : 53,
        "rate"  : 2,
        "newMembers" : 4
    }
  }';
});
$app->post('/checkin/:orgId/:meetingId/:userId', function($orgId, $meetingId, $userId) {
  //Sample Output...also puts in a bad query (should always be @ top)
  echo '
  {
    "checkins" : [
        {
         "id" : "'.$userId.'",
         "major" : "CMPE",
         "email" : "cbookman@gatech.edu", 
         "affiliation" : "student",
         "name" : {
            "first" : "Colin",
            "middle" : "Paul",
            "last" : "Bookman",
            "full" : "'.$userId.'"
         },
         "checkinTime" : "2014-03-27T15:20:51.869Z",
         "isNew" : false
        },
        {
         "id" : "cbookman3",
         "major" : "CMPE",
         "email" : "cbookman@gatech.edu", 
         "affiliation" : "student",
         "name" : {
            "first" : "Colin",
            "middle" : "Paul",
            "last" : "Bookman",
            "full" : "Bookman, Colin Paul"
         },
         "checkinTime" : "2014-03-27T15:20:51.869Z",
         "isNew" : true
        },
        { "id" : "gburdell3",
         "major" : "CMPE",
         "email" : "cbookman@gatech.edu", 
         "affiliation" : "student",
         "name" : {
            "first" : "Colin",
            "middle" : "Paul",
            "last" : "Bookman",
            "full" : "Bookman, Colin Paul"
         },
         "checkinTime" : "2014-03-27T15:20:22.578Z",
         "isNew" : false
        }
    ],
    "statistics" : {
        "attendance" : 53,
        "rate"  : 2,
        "newMembers" : 4
    }
  }';
});
$app->notFound(function () use ($app) {
   echo '{ "error" : "invalid API call"}';
});
?>
