define(['backbone', 'models/organization', 'views/errorPage'],
function(backbone ,  OrganizationModel   ,  ErrorPage       ) {
  var OrganizationsCollection = Backbone.Collection.extend({
    model :  OrganizationModel,
    initialize: function(options) {
    },
    url : '/api/organizations',
    parse : function(res) {
      if(res.hasOwnProperty("error")) {
        ( new ErrorPage() ).render(res.error);
        return false;
      } else {
        return res;
      }
    }
  });
  return OrganizationsCollection;
});