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
    "jquery": "../vendor/bower/jquery/dist/jquery",
    "backbone": "../vendor/bower/backbone/backbone",
    "handlebars" : "../vendor/bower/handlebars/handlebars.min",
    "modernizr" : "../vendor/bower/modernizr/modernizr",
    "foundation" : "../vendor/bower/foundation/js/foundation.min",
    //templates
    "templates" : "../templates",

    //Views
    "views/errorPage"           :  "views/errorPage",
    "views/loading"             :  "views/loading",
    "views/nav"                 :  "views/nav",
    "views/home"                :  "views/home",
    "views/checkInTotals"       :  "views/checkInTotals",
    "views/orgMeetingForm"      :  "views/orgMeetingForm",
    "views/organizations/info"  :  "views/organizations/info",
    "views/organizations/list"  :  "views/organizations/list",
    "views/checkInGuest"        :  "views/checkInGuest",
    "views/log"                 :  "views/log",
    "views/meetings"            :  "views/meetings",
    "views/marketing"           :  "views/marketing",

    //Models
    "models/user" : "models/user",
    "models/organization" : "models/organization",
    "models/meeting"      : "models/meeting",
    "models/permissions"  : "models/permissions",
    
    //Collections
    "collections/organization"    : "collections/organization",
    "collections/meeting"         : "collections/meeting",
    "collections/checkIns.js"     : "collections/checkIns",

    //Controllers
    "controllers/bindControllers"     : "controllers/bindControllers",
    "controllers/bindLinksToBackbone" : "controllers/bindLinksToBackbone",
    
    "controllers/home"          :  "controllers/home",
    "controllers/checkInTotals" :  "controllers/checkInTotals",
    "controllers/triggers/new"  :  "controllers/triggers/new",
    "controllers/organization"  :  "controllers/organization",
    "controllers/checkInGuest"  :  "controllers/checkInGuest",
    "controllers/log"           :  "controllers/log",
    "controllers/meetings"      :  "controllers/meetings",
    "controllers/marketing"     :  "controllers/marketing"
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
