define(['jquery', 'backbone', 'templates'],
function($,        Backbone,   templates) {
  var NavView = Backbone.View.extend({
    initialize: function(options) {
      this.user = options.user;
    },
    render : function() {
      $('.top-bar').html(templates['nav/topBar']());
      $('.left-off-canvas-menu').html(templates['nav/leftOffCanvas']());
    },
    remove : function() {
      this.stopListening();
      this.undelegateEvents();
      $('.top-bar').html('');
      $('.left-off-canvas-menu').html('');
    }

  });
  return NavView;
});