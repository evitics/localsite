define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");

  // Defining the application router.
  module.exports = Backbone.Router.extend({
    routes: {
      "(/)": "index",
      "help" : "help",
      "meetings" : "meetings",
      "analytics" : "checkInTotals",
      "analytics/log/:orgId/:meetingId/:year" : "log",
      "analytics/log/:orgId/:meetingId/:year/:month" : "log",
      "analytics/log/:orgId/:meetingId/:year/:month/:day" : "log",
      "triggers/new/:triggerType" : "newTrigger",
      "organizations" : "organizations",
      "organizations/new"    : "newOrganizationForm",
      "organizations/:orgId" : "organizations",
      "meeting/:orgId/:meetingId" : "checkInGuest"
    }
  });
});
