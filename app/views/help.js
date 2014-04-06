define(['jquery', 'backbone', 'templates'],
function($,        Backbone,   templates ) {
  var HelpView = Backbone.View.extend({
    el : '.site-content',
    events : {
    },
    initialize: function(options) {
    },
    render : function() {
      this.$el.html(templates.help());
    },
    remove : function() {
      this.unBindVents();
      this.stopListening();
      this.$el.html('');
    }
  });
  return HelpView;
});