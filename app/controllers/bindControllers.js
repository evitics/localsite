define(['jquery', 'underscore', 'backbone', 'controllers/home', 'controllers/checkInTotals', 'controllers/triggers/new', 'controllers/organization', 'controllers/checkInGuest', 'controllers/log', 'controllers/meetings', 'controllers/marketing', 'views/help'],
function($      ,  _          ,  Backbone ,  HomeController   ,  CheckInTotalsController   ,  NewTriggerController     ,  OrganizationController   ,  CheckInGuestController   ,  LogController   ,  MeetingsController   ,  MarketingController   ,  HelpView   ) {
  var bindControllers = function(app, user) {
    var vent = _.extend({}, Backbone.Events);
    
    app.router.on('route:index', function() {
      app.controller = new HomeController({app : app, user: user, vent : vent});
    });
    app.router.on('route:log', function(orgId, meetingId, year, month, day) {
      var params = {
        app : app,
        user : user,
        vent : vent,
        orgId : orgId,
        meetingId : meetingId
      };
      if(typeof year !== 'undefined')  { params.year  = year;  }
      if(typeof month !== 'undefined') { params.month = month; }
      if(typeof day !== 'undefined')   { params.day   = day;   }

      app.controller = new LogController(params);
    });
    app.router.on('route:marketing', function() {
      app.controller = MarketingController({ app: app, user: user, vent: vent });
    });
    app.router.on('route:checkInTotals', function() {
      app.controller = new CheckInTotalsController({ app : app, user: user, vent: vent });
    });

    app.router.on('route:newTrigger', function(triggerType) {
      app.controller = new NewTriggerController({
          app: app,
          user: user,
          vent : vent,
          triggerType: triggerType
      });
    });

    app.router.on('route:organizations' , function(orgId) {
      var context = {
        app: app, user: user, vent: vent
      };
      if(orgId) {
        context.orgId = orgId;
      }
      app.controller = new OrganizationController(context);
    });
    app.router.on('route:newOrganizationForm', function() {
      window.location.href= "http://jacketpages.gatech.edu/pages/contact";
    });
    app.router.on('route:checkInGuest', function(orgId, meetingId) {
      app.controller = new CheckInGuestController({
        app : app,
        user: user,
        vent: vent,
        orgId: orgId,
        meetingId: meetingId
      });
    });
    app.router.on('route:help', function() {
      app.views.current = new HelpView();
      app.views.current.render();
    });
    app.router.on('route:meetings', function() {
      app.controller = new MeetingsController({
        app: app,
        user: user,
        vent: vent
      });
    });
    /*
      Vent Actions
    */
    vent.bind("post:startMeeting", function(post) {
      if(post.hasOwnProperty('orgId') && post.hasOwnProperty('meetingId')) {
        app.views.current.remove();
        app.router.navigate("/meeting/" + post.orgId + "/" + post.meetingId, {trigger :true});
      }
    });
  };
  return bindControllers;
});