define(['jquery', 'foundation', 'backbone', 'templates', 'models/Meeting'],
function($      ,  foundation ,  Backbone,   templates ,  MeetingModel) {
  var OrgMeetingFormView = Backbone.View.extend({
    initialize: function(options) {
      if(!options.hasOwnProperty('user')) {
        throw new Error("No user model given in options");
      }
      if(!options.hasOwnProperty('vent')) {
        throw new Error("No vent given in options");
      }
      if(!options.hasOwnProperty('el')) {
        throw new Error("No element givent to bind to");
      }
      if(!options.hasOwnProperty('headerTXT')) {
        throw new Error("No headerTXT given (Text to put above the form as a header element)");
      }
      this.user = options.user;
      this.vent = options.vent;
      this.submitButtonTXT = options.submitButtonTXT;
      this.headerTXT = options.headerTXT;
    },
    events : {
      'click button.submit' : 'submitForm',
      'submit #createNewMeeting' : 'submitForm',
      'change select.organization-dropdown' : 'organizationChanged'
    },
    closeModal : function() {
      this.$newMeetingModal.foundation('reveal', 'close');
    },
    createAMeeting : function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var orgId = this.$el.find('.organization-dropdown').val();
      var that = this;
      var meeting = new MeetingModel({
        name: $("#createNewMeeting .meetingName").val(),
        orgId : orgId,
        onCheckIn : $('#createNewMeeting #onCheckIn').val()
      });
      
      meeting.save(null, {
        success : function(res) {
          debug3 = res;
          that.user.get('organizations').get(orgId).get('meetings').add(res);
          that.render();
          var context = res.toJSON();
          context.orgName = that.user.get('organizations').get(orgId).toJSON().name;
          that.$el.find("#orgMeetingAlert").html(templates['forms/orgMeeting/alert'](context));
        },
        error : function(r,s) {
          alert("error: Could not add meeting");
        }
      });
      this.closeModal();
    },
    organizationChanged : function(ev) {
      var optionValue = ev.target.value.trim();
      //check if a valid organization was selected
      if(optionValue.length > 0) {
        this.showMeetingsFor(optionValue);
      } else {
        //disable meetings dropdown
        var meetingDropdown = this.$el.find('.meeting-dropdown');
        meetingDropdown.prop('disabled', true);
        meetingDropdown.html('');
        //disable start meeting button
        this.$el.find('.submit').prop('disabled', true);
        //disable the new meeting button
        debug = this.$el;
        this.$el.find('.revealNewMeetingModal').addClass('disabled');
      }
    },
    showMeetingsFor : function(orgId) {
      var meetings = this.user.get('organizations').get(orgId).get('meetings');
      var html = templates['forms/orgMeeting/meetings'](meetings.toJSON());
      //display organizations meetings
      var meetingDropdown = this.$el.find('.meeting-dropdown');
      meetingDropdown.html(html);
      //make sure the meeting select dropdown is enabled
      meetingDropdown.removeAttr('disabled');
      //enable the start button
      this.$el.find('.submit').removeAttr('disabled');
      //enable the new meeting button
      this.$el.find('.revealNewMeetingModal').removeClass('disabled');
    },
    submitForm : function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var post = {
        orgId : this.$el.find('.organization-dropdown').val(),
        meetingId : this.$el.find('.meeting-dropdown').val()
      };
      /* Have controller handle this */
      this.vent.trigger("post:orgMeetingForm", post);
    },
    render : function() {
      var context = this.user.toJSONR();
      context.submitButtonTXT = this.submitButtonTXT;
      context.headerTXT = this.headerTXT;
      this.$el.html(templates['forms/orgMeeting/layout'](context));
      this.$el.foundation();
      this.$newMeetingModal = $("#newMeetingModal");
      this.bindModalEvents();
    },
    bindModalEvents : function() {
      var that = this;
      this.unbindModalEvents();
      //Open modal only if we've got a valid organization selected.
      this.$el.find("a.revealNewMeetingModal").on('click', function(ev) {
        var meetingDropdown = that.$el.find(".meeting-dropdown");
        if(!meetingDropdown.attr('disabled')) {
          that.$newMeetingModal.foundation('reveal','open');
        }
      });

      //Bind ot valid form submission
      this.$newMeetingModal.on('valid', function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        that.createAMeeting(ev);
      });

      //Bind to the buttons for adding event triggers
      this.$newMeetingModal.find('a.addEvTrigger').on('click', function(ev) {
        that.$newMeetingModal.foundation('reveal', 'close');
      });
    },
    unbindModalEvents : function() {
      this.$newMeetingModal.off();
      this.$el.find("a.revealNewMeetingModal").off();
    },
    remove : function() {
      this.stopListening();
      this.unbindModalEvents();
      //Make sure the modal actually removes itself (ugh)
      this.closeModal(); //removes any stray elements w/animation
      this.$newMeetingModal.remove(); //stops animation and removes elemnts
      this.$el.remove(); //remove the view's contents
    }
  });
  return OrgMeetingFormView;
});