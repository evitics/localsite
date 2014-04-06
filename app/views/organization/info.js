define(['jquery', 'backbone', 'templates'],
function($,        Backbone,   templates) {
  var OrganizationInfoView = Backbone.View.extend({
    el : '.site-content',
    events : {
      'click .leaveOrg' : 'leaveOrg',
      'click .joinOrg'  : 'request2JoinOrg'
    },
    initialize : function(options) {
      this.organization = options.organization;
      this.user = options.user;
    },
    render : function() {
      var context = this.organization.toJSON();
      context.joined = false; //user belongs to organization
      context.requestPending = false; //user sent a request to belong to organization

      var userOrganization = this.user.get('organizations').get(this.organization);
      if(userOrganization) {
        //Check for pending request
        userOrganization = userOrganization.toJSON();
        if(userOrganization.hasOwnProperty("requestPending") &&
           userOrganization.requestPending === true) {
            context.requestPending = true;
        } else {
          context.joined = true;
        }
      }
      this.$el.html(templates['organization/info'](context));
    },
    request2JoinOrg : function(ev) {
      ev.stopPropegation();
      ev.preventDefault();
      
    },
    leaveOrg : function(ev) {
      ev.stopPropegation();
      ev.preventDefault();

    },
    remove : function() {
      this.stopListening();
      this.$el.html('');
    }
  });
  return OrganizationInfoView;
});