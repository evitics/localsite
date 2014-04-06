define(["jquery", "backbone", "views/log"],
function($,        Backbone,   LogView   ) {
  var LogController = function(options) {
    var app = options.app;
    app.views.current = new LogView(options);
    app.views.current.render();
  };
  return LogController;
});