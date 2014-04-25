define(['jquery', 'backbone', 'templates'],
function($,        Backbone,   templates) {
  var ErrorPage = Backbone.View.extend({
    render : function(errMsg) {
      if(errMsg) {
        this.errMsg = errMsg;
      } else {
        this.errMsg = '';
      }
      document.body.innerHTML = templates['404']({errMsg : this.errMsg});
      throw new Error(errMsg);
    }
  });
  return ErrorPage;
});