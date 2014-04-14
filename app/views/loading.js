define(['jquery', 'backbone', 'templates',],
function($,        Backbone,   templates) {
  var LoadingView = Backbone.View.extend({
    el : '.site-content',
    render : function(msg) {
      this.$el.html('<div class="loadingMsg" style="display:none"></div>');

      var that = this;
      setTimeout(function() {
        var loadingMsg = that.$el.find(".loadingMsg");
        if(loadingMsg.length > 0) {
          loadingMsg.html(templates.loading({msg: msg}));
          loadingMsg.css("display","block");
        }
      }, 200);
    },
    remove : function() {
      this.stopListening();
      this.undelegateEvents();
      this.$el.html('');
    }
  });
  return LoadingView;
});