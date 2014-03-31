define(['backbone'],
function(backbone) {
  var OrganizationModel = Backbone.Model.extend({
    idAttribute : 'orgId',
    initialize : function(options) {
      if(typeof options.orgId === 'undefined') {
        throw new Error("orgId not specified");
      }
      this.orgId = options.orgId;
      this.user = options.user;
    },
    url : function() {
      return '/api/organizations/' + this.orgId;
    }
  });
  return OrganizationModel;
});