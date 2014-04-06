define(["jquery", "backbone", "views/meetings"],
function($,        Backbone,   MeetingsView   ) {
  var MeetingsController = function(options) {
    var app = options.app;
    app.views.current = new MeetingsView(options);
    app.views.current.render();
  };
  return MeetingsController;
});