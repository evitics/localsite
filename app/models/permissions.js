define(['backbone', 'views/errorPage'],
function(backbone ,  ErrorPage       ) {
  var OrganizationPermissionModel = Backbone.Model.extend({
    initialize : function(options) {
      this.orgId = options.orgId;
      this.userId = options.userId;
    },
    url : function() {
      return '/api/organization/permission/' + this.orgId;
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
  return OrganizationPermissionModel;
});
