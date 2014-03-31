define(["jquery", "backbone", "models/organization", "collections/organization", "views/organization/list", "views/organization/info", "views/errorPage", "views/loading"],
function($,        Backbone,   OrganizationModel   ,  OrganizationCollection   ,  OrganizationList         ,  OrganizationInfo         ,  ErrorPage       ,  LoadingView) {
  var OrganizationController = function(options) {
    this.app = options.app;
    this.user = options.user;
    if(typeof options.orgId === 'undefined') {
      this.showOrganizationList();
    } else {
      this.orgId = options.orgId;
      this.showOrganization(options.orgId);
    }
  };

  /*
    Handle the loading view
  */
  OrganizationController.prototype.showLoadingView = function(msg) {
    this.loadingView = new LoadingView({});
    this.loadingView.render(msg);
  };
  OrganizationController.prototype.removeLoadingView = function() {
    this.loadingView.remove();
  };

  /*
    Fetch a list of all organizations, once fetched display them
  */
  OrganizationController.prototype.showOrganizationList = function() {
    //Show loading view while we get a list of orgs
    this.showLoadingView("Please wait while we get a list of all the organizations");

    //Fetch a list of organizations
    var that = this;
    var organizationCollection = new OrganizationCollection({user: this.user});
    organizationCollection.fetch({
      user : that.user, //Here so that the model gets the user obj
      success : function() {
        that.app.views.current = new OrganizationList({organizations: organizationCollection, user: that.user});
        that.removeLoadingView();
        that.app.views.current.render();
      },
      error : function(m , r) {
        (new ErrorPage()).render("Could not load organization List: " + JSON.stringify(r));
      }
    });
  };

  /*
    Fetch the specific organization, once fetched display it
  */
  OrganizationController.prototype.showOrganization = function(orgId) {
    //show loading view while we get the organization
    this.showLoadingView("Please wait while we get the infromation for " + orgId);

    //fetch the organization
    var that = this;
    var organizationModel = new OrganizationModel({orgId : orgId, user: this.user});
    organizationModel.fetch({
      success : function() {
        that.app.views.current = new OrganizationInfo({organization: organizationModel, user: that.user});
        that.removeLoadingView();
        that.app.views.current.render();
      },
      error : function(m, r) {
        (new ErrorPage()).render("Could not load information for organization: " + orgId + "\n\nerror: " + JSON.stringify(r));
      }
    });
  };

  return OrganizationController;
});