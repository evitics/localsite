define(["jquery", "backbone", "views/marketing"],
function($,        Backbone,   MarketingView       ) {
  var MarketingController = function(options) {
    var app = options.app;
    app.views.current = new MarketingView(options);
    app.views.current.render();
  };
  return MarketingController;
});