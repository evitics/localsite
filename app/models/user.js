define(['backbone', "collections/organization", "collections/meeting", 'views/errorPage'],
function(backbone,   OrganizationCollection   ,  MeetingCollection   ,  ErrorPage       ) {
  var UserModel = Backbone.Model.extend({
    idAttribute : "username",
    parse : function(res) {
      if(res.hasOwnProperty("error")) {
        ( new ErrorPage() ).render(res.error);
        return false;
      }
      //convert to organization collection
      res.organizations = new OrganizationCollection(res.organizations);
      res.organizations.each(function(organization) {
        //Make the meetings property a collection
        organization.set("meetings", new MeetingCollection(organization.get('meetings')));
      });
      return res;
    },
    urlRoot : '/api/user',
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
