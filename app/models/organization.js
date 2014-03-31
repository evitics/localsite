define(['backbone', 'views/errorPage'],
function(backbone ,  ErrorPage       ) {
  var OrganizationModel = Backbone.Model.extend({
    idAttribute : 'orgId',
    initialize : function(options) {
      this.orgId = options.orgId;
    },
    url : function() {
      var out = '/api/organizations';
      if(typeof this.orgId !== "undefined") {
        out += '/' + this.orgId;
      }
      return out;
    },
    parse : function(res) {
      if(res.hasOwnProperty("error")) {
        ( new ErrorPage() ).render(res.error);
        return false;
      } else {
        return res;
      }
    }
  });
  return OrganizationModel;
});