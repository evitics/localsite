define(['jquery', 'backbone', 'templates', 'models/permissions'],
function($,        Backbone,   templates ,  PermissionModel) {
  var OrganizationInfoView = Backbone.View.extend({
    el : '.site-content',
    events : {
      'click .leaveOrg' : 'leaveOrg',
      'click .joinOrg'  : 'request2JoinOrg',
      
      'click #addNewUser .submit' : function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var userId = $(".addNewUser.username").val();
        var writePerm = 0;
        this.addNewUser(userId, writePerm);
      },
      'keypress #addNewUser .addNewUser.username' : function(ev) {
        if(ev.which === 13) { //enter key pressed down
          var userId = $(".addNewUser.username").val();
          var writePerm = 0;
          this.addNewUser(userId, writePerm);
        }
      },
      
      'click #pendingRequestsPermissions .add' : 'approvePendingRequest',
      'click #pendingRequestsPermissions .remove' : 'denyPendingRequest',

      'change #registeredUserPermissions .writePerm' : 'changeWritePerm',
      'click #registeredUserPermissions .remove' : 'onRemoveUser'
    },
    initialize : function(options) {
      this.organization = options.organization;
      this.user = options.user;
      //default values
      this.writePerm = false;
      this.joined = false;
      this.requestPending = false;
      this.orgId = this.organization.get('orgId');

      //check for writePerm, joined, and requestPending
      var userOrganization = this.user.get('organizations').get(this.organization);
      if(userOrganization && userOrganization.get('isPending')) {
        this.requestPending = true;
      } else if(userOrganization && !userOrganization.get('isPending')) {
        this.joined = true;
        //if write permissions we should get the permission model
        if(userOrganization.get('writePerm')) {
          this.writePerm = true;
          this.permissions = new PermissionModel({orgId : userOrganization.get('orgId') }); //could also use this.organization for orgId
          this.permissions.bind('change', this.renderPermissions, this);
        }
      }
    },
    render : function() {
      var context = this.organization.toJSON();
      context.joined = this.joined; //user belongs to organization
      context.requestPending = this.requestPending; //user sent a request to belong to organizations
      this.$el.html(templates['organization/info'](context));
      if(this.writePerm) {
        this.permissions.fetch();
      }
    },
    renderPermissions : function() {
      var context = this.permissions.toJSON();
      //delete the users object for the logged in user
      for(var i = 0, l = context.users.length; i < l; ++i) {
        if(context.users[i].userId == this.user.id) {
          context.users.splice(i, 1);
          break; //supper hacky I know
        }
      }
      this.$el.find("#orgPermissions").html(templates['organization/permissions'](context));
    },
    request2JoinOrg : function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      $.post('/api/organization/join/' + this.organization.get('orgId'),
             {userId : this.user.get('username') })
        .done(function(data) {
          if(data.hasOwnProperty('error')) {
            alert('error: ' + data.error);
          } else {
            location.reload(); //re-get the user data...etc
          }
        })
        .fail(function() {
          alert("Error, could not complete action");
        });
    },
    leaveOrg : function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.delUser(this.user.get('username'), function onSuccess() {
        location.reload(); //re-get the user data...etc
      });
    },
    addNewUser : function(userId, writePerm) {
      var that = this;
      $.ajax({
        url : '/api/organization/permission/' + this.orgId + '/' + userId,
        type: 'post',
        data: {'writePerm' : writePerm},
        success: function(data) {
          if(data.hasOwnProperty('error')) {
            alert("Error: " + data.error);
          }
          that.permissions.fetch(); //refetch perm list and re-render
        },
        error: function(r,s) {
          alert("error, could not complete request");
        }
      });
    },
    approvePendingRequest : function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var userId = $(ev.target).data('userid');
      var writePerm = $("#" + userId).find("input.writePerm").prop('checked') ? 1 : 0;
      this.addNewUser(userId, writePerm);
    },
    denyPendingRequest : function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var userId = $(ev.target).data('userid');
      this.delUser(userId);
    },
    /*
      Change a non pending user's write permission to the checkbox value
    */
    changeWritePerm : function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var userId = $(ev.target).data('userid');
      var writePerm = ev.target.checked ? 1 : 0;
      this.sendUserObj({
        userId : userId,
        writePerm : writePerm,
        isPending : 0
      });
    },
    onRemoveUser : function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.delUser($(ev.target).data('userid'));
      
    },
    delUser : function(userId, onSuccessCallback) {
      var that = this;
      $.ajax({
        url : '/api/organization/permission/' + this.orgId + '/' + userId,
        type : 'delete',
        success : function(data) {
          if(data.hasOwnProperty('error')) {
            alert("Error: " + data.error);
          } else {
            $("#"+userId).remove();
          }
          if(typeof onSuccessCallback === 'function') { onSuccessCallback(); }
        },
        error: function() {
          alert("Error, could not delete user");
        }
      });
    },
    sendUserObj : function(userObj) {
      $.post('/api/organization/permission/'+this.orgId, userObj)
       .done(function(data) {
        if(data.hasOwnProperty('error')) {
          alert('Error: ' + data.error + '\nReloading page...');
          location.reload();
        }
       })
       .fail(function() {
        alert('Could connect to server\nReloading page...');
        location.reload();
       });
    },
    remove : function() {
      if(this.permissions) {
        this.permissions.off();
      }
      this.stopListening();
      this.undelegateEvents();
      this.$el.html('');
      this.$el.off();
    }
  });
  return OrganizationInfoView;
});