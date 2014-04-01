// Break out the application running from the configuration definition to
// assist with testing.
require(["config"], function() {
  // Kick off the application.
  require(["app", "router", "foundation", "views/errorPage", "models/user", "views/nav", "controllers/bindLinksToBackbone", "controllers/bindControllers" ],
  function( app,   Router,   foundation,   ErrorPage,         User,          NavView,     bindLinksToBackbone,               bindControllers) {
    var user = new User();
    user.fetch({
      success : function(user) {
        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        app.router = new Router();
        /* 
          A place which stores the current view
          and or other previous inited views we want to keep
        */
        app.views = {
            current : null //the current view goes here
        };

        // Captures <a href="/...."></a> and forces a backbone.js route
        bindLinksToBackbone(app);

        // This code binds the new route events to each controller
        bindControllers(app, user);
        
        // Show the Nav
        var navView = new NavView({user : user});
        navView.render();
        $(document).foundation();
        
        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default.  Change in app.js.
        Backbone.history.start({ pushState: true, root: app.root });
      },
      error : function(m, r)  {
        ( new ErrorPage() ).render("Could not load user account");
      }
    });
  });
});
