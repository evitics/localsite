define(['jquery', 'backbone', 'templates'],
function($,        Backbone,   templates) {
  var OrganizationListView = Backbone.View.extend({
    el : '.site-content',
    initialize : function(options) {
      this.organizations = options.organizations;
      this.user = options.user;
    },
    render : function() {
      this.$el.html(templates['organization/list/wrapper']());
      this.renderMyOrganizations();
      this.renderOtherOrganizations();
    },
    renderMyOrganizations: function() {
      var myOrganizations = this.user.get('organizations');
      var html = '';
      var itemTemplate = templates['organization/list/item']; //pointer to template function

      this.user.get('organizations').each(function(organization) {
        html += itemTemplate(organization.toJSON());
      });

      this.$el.find('section#myOrganizations ul').html(html);
    },
    /*
        Only displays orgs which I don't belong to
        Hence the 'other organizations'
    */
    renderOtherOrganizations : function() {
      //var myOrgsIdArr = this.user.getOrgIds(); //array of the organizations user belongs to
      var html = '';
      var itemTemplate = templates['organization/list/item']; //pointer to template function
      var usersOrganizations = this.user.get("organizations");
      
      this.organizations.each(function(organization) {
        if(!usersOrganizations.get(organization.orgId)) {
          html += itemTemplate(organization.toJSON());
        }
      });
      this.$el.find('section#otherOrganizations ul').html(html);
    },
    remove : function() {
      this.stopListening();
      this.$el.html('');
    }
  });
  return OrganizationListView;
});