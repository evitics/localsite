define(['jquery', 'underscore', 'backbone', 'controllers/home', 'controllers/checkInTotals', 'controllers/triggers/new', 'controllers/organization', 'controllers/checkInGuest'],
function($      ,  _          ,  Backbone ,  HomeController   ,  CheckInTotalsController   ,  NewTriggerController     ,  OrganizationController   ,  CheckInGuestController) {
  var bindControllers = function(app, user) {
    var vent = _.extend({}, Backbone.Events);

    app.router.on('route:index', function() {
      app.controller = new HomeController({app : app, user: user, vent : vent});
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
      app.controller = new OrganizationController({
        app: app,
        user: user,
        vent: vent,
        orgId: orgId
      });
    });

    app.router.on('route:newOrganizationForm', function() {
      window.location.href= "http://jacketpages.gatech.edu/pages/contact";
    });
    app.router.on('route:checkInGuest', function(orgId, meetingId) {
      app.views.current = new CheckInGuestController({
        app : app,
        user: user,
        vent: vent,
        orgId: orgId,
        meetingId: meetingId
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
    vent.bind("post:createAMeeting", function(post) {
      alert("Creating Meeting...");
      alert(JSON.stringify(post));
    });
  };
  return bindControllers;
});