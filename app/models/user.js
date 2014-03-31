define(['backbone', "collections/organization", "collections/meeting"],
function(backbone,   OrganizationCollection   ,  MeetingCollection   ) {
  var UserModel = Backbone.Model.extend({
    idAttribute : "username",
    initialize: function(options) {
      this.set('username', options.username);
    },
    parse : function(res) {
      //convert to organization collection
      res.organizations = new OrganizationCollection(res.organizations);
      res.organizations.each(function(organization) {
        //Make the meetings property a collection
        organization.set("meetings", new MeetingCollection(organization.get('meetings')));
      });
      return res;
    },
    urlRoot : '/api/user/',
    /*
      Recursive toJSON, which converts the collection to a 
      json obj
    */
    toJSONR : function() {
      debug = JSON.parse(JSON.stringify(this.attributes));
      return JSON.parse(JSON.stringify(this.attributes));
    }
  });
  return UserModel;
});