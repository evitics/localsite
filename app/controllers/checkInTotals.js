define(["jquery", "backbone", "views/checkInTotals"],
function($,        Backbone,   CheckInTotalsView   ) {
  var CheckInTotalsController = function(options) {
    this.view = new CheckInTotalsView(options);
    this.view.render();
  };
  return CheckInTotalsController;
});