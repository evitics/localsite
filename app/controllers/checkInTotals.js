define(["jquery", "backbone", "views/checkInTotals"],
function($,        Backbone,   CheckInTotalsView   ) {
  var CheckInTotalsController = function(options) {
    var app = options.app;
    app.views.current = new CheckInTotalsView(options);
    app.views.current.render();
  };
  return CheckInTotalsController;
});