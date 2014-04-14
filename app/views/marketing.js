define(['jquery', 'backbone', 'templates', 'views/orgMeetingForm'],
function($,        Backbone,   templates ,  OrgMeetingForm       ) {
  var MarketingView = Backbone.View.extend({
    el : '.site-content',
    events: {
      'change .meeting-dropdown' : 'meetingChanged',
      'change .organization-dropdown' : function(ev) { this.addAllOption(ev); this.meetingChanged(ev); },
      'submit #marketingEmailForm' : 'sendEmails'
    },
    /*
      Adds an option to select 'all' meetings
    */
    addAllOption : function(ev) {
      var meetingDropdown = this.$el.find(".meeting-dropdown");
      meetingDropdown.html('<option value="all">Everyone in Organization</option>' + meetingDropdown.html());
    },
    initialize: function(options) {
      if(!options.hasOwnProperty("user")) {
        throw new Error("Marketing view requires the user model to be passed");
      }
      if(!options.hasOwnProperty("vent")) {
        throw new Error("Marketing view requires the vent to be passed");
      }
      this.user = options.user;
      this.vent = options.vent;
    },
    render : function() {
      this.$el.html(templates['marketing/wrapper'](this.user.toJSONR()));
      this.orgMeetingForm = new OrgMeetingForm({
        user: this.user,
        vent: this.vent,
        headerTXT : "What organization do you want to perform marketing for?",
        el : '.orgMeetingForm'
      });
      this.orgMeetingForm.render();
    },
    renderMarketing : function(orgId, meetingId) {
      var context = {};
      if(isNaN(meetingId) && meetingId === 'all') {
        context = {
          emailTo : "{{guest.email}}",
          emailFrom : "{{organization.email}}",
          emailSubject : "{{organization.name}} sends their regards",
          emailMessage : "Hi {{guest.name.full}},\n.....\n\nRegards,\n{{organization.name}}"
        };
      } else {
        context = this.user.get('organizations').get(orgId).get('meetings').get(meetingId).toJSON();
      }
      this.$el.find('#marketingEmailFormWrapper').html(templates['marketing/emailForm'](context));
      this.$el.find('#marketingEmailFormWrapper').foundation();
    },
    meetingChanged : function() {
      var meetingId = this.$el.find(".meeting-dropdown").val();
      var orgId = this.$el.find(".organization-dropdown").val();
      /*
        Test if undefined or null or 0 string length
        aka: '',[], undefined, null
      */
      if(typeof meetingId === 'undefined' || meetingId === null || meetingId.length === 0 ||
          typeof orgId === 'undefined' || orgId === null || orgId.length === 0) {
        //remove our total graph
        this.$el.find("#marketingEmailFormWrapper").empty();
        
      } else {
        this.renderMarketing(orgId, meetingId);
      }
    },
    sendEmails : function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var meetingId = this.$el.find(".meeting-dropdown").val();
      var orgId = this.$el.find(".organization-dropdown").val();

      var emailForm = this.$el.find('#marketingEmailForm');
      var emailContext = {
        to: emailForm.find('#marketing-emailTo').val(),
        from: emailForm.find('#marketing-emailFrom').val(),
        subject : emailForm.find('#marketing-emailSubject').val(),
        message : emailForm.find('#marketing-emailMessage').val(),
        orgId : orgId,
        meetingId : meetingId
      };
      var statusBar = this.$el.find("#alertInformation");
      statusBar.show();
      statusBar.html('Please wait while all the emails are being sent out');
      $.post('/api/marketing/email', emailContext, function(data) {
        var msg = '';
        if(data.hasOwnProperty('error')) {
          msg = "Error: " + data.error;
          statusBar.removeClass('success');
          statusBar.addClass('alert');
        } else if(data.hasOwnProperty('status')) {
          msg = data.status;
          statusBar.removeClass('alert');
          statusBar.addClass('success');
        } else {
          statusBar.removeClass('alert');
          statusBar.addClass('success');
          msg = "Sent out all emails";
        }
        statusBar.html(msg);
      }).fail(function() {
        statusBar.html("Error: could not send emails");
        statusBar.removeClass('success');
        statusBar.addClass('error');
         
      });
    },
    remove : function() {
      this.orgMeetingForm.remove();
      this.stopListening();
      this.undelegateEvents();
      this.vent.off("post:orgMeetingForm");
      this.$el.html('');
    }
  });
  return MarketingView;
});