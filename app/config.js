// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  paths: {
    // Make vendor easier to access.
    "vendor": "../vendor",
    // Almond is used to lighten the output filesize.
    "almond": "../vendor/bower/almond/almond",

    // Opt for Lo-Dash Underscore compatibility build over Underscore.
    "underscore": "../vendor/bower/lodash/dist/lodash.underscore",

    // Map remaining vendor dependencies.
    "jquery": "../vendor/bower/jquery/jquery",
    "backbone": "../vendor/bower/backbone/backbone",
    "handlebars" : "../vendor/bower/handlebars/handlebars.min",
    "modernizr" : "../vendor/bower/foundation/js/vendor/modernizr",
    "foundation" : "../vendor/bower/foundation/js/foundation.min",
    //templates
    "templates" : "../templates",

    //Views
    "views/errorPage"           :  "views/errorPage",
    "views/loading"             :  "views/loading",
    "views/nav"                 :  "views/nav",
    "views/home"                :  "views/home",
    "views/analyitics"          :  "views/analyitics",
    "views/orgMeetingForm"      :  "views/orgMeetingForm",
    "views/organizations/info"  :  "views/organizations/info",
    "views/organizations/list"  :  "views/organizations/list",
    "views/checkinGuest"        :  "views/checkinGuest",
    //Models
    "models/user" : "models/user",
    "models/organization" : "models/organization",
    "models/meeting"      : "models/meeting",
    
    //Collections
    "collections/organization" : "collections/organization",
    "collections/meeting"      : "collections/meeting",
    "collections/checkIns.js"  : "collecitons/checkIns",
    
    //Controllers
    "controllers/bindControllers" : "controllers/bindControllers",
    "controllers/bindLinksToBackbone" : "controllers/bindLinksToBackbone",
    
    "controllers/home"  : "controllers/home",
    "controllers/analyitics" : "controllers/analyitics",
    "controllers/triggers/new" : "controllers/triggers/new",
    "controllers/organization" : "controllers/organization",
    "controllers/checkinGuest" : "controllers/checkinGuest"
  },

  shim: {
    // This is required to ensure Backbone works as expected within the AMD
    // environment.
    "backbone": {
      // These are the two hard dependencies that will be loaded first.
      deps: ["jquery", "underscore"],

      // This maps the global `Backbone` object to `require("backbone")`.
      exports: "Backbone"
    },
    "handlebars" : {
      exports: "Handlebars",
      init: function() {
        this.Handlebars = Handlebars;
        return this.Handlebars;
      }
    },
    "foundation" : {
      deps: ["jquery", "modernizr"]
    }
  }
});
