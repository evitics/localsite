define(['jquery', 'backbone', 'templates', 'views/orgMeetingForm', 'models/meeting'],
function($,        Backbone,   templates ,  OrgMeetingForm        ,  MeetingModel) {
  var MeetingsView = Backbone.View.extend({
    el : '.site-content',
    events: {
      'change .meeting-dropdown' : 'meetingChanged',
      'change .organization-dropdown' : 'meetingChanged', //whenever org changes, default meeting selected
      'click .delete' : 'deleteMeeting',
      'click .save' : 'saveMeeting',
      'submit #saveMeeting' : 'saveMeeting'
    },
    initialize: function(options) {
      if(!options.hasOwnProperty("user")) {
        throw new Error("Meetings view requires the user model to be passed");
      }
      if(!options.hasOwnProperty("vent")) {
        throw new Error("Meetings view requires vent to be passed");
      }
      this.user = options.user;
      this.vent = options.vent;
    },
    render : function() {
      this.$el.html(templates['meetings/wrapper'](this.user.toJSONR()));
      //if meetingForm previously rendered, remove it
      if(this.meetingForm) { this.meetingForm.remove(); }
      //re-render form
      this.meetingForm = new OrgMeetingForm({
        user: this.user,
        vent: this.vent,
        headerTXT : "Please select an Organization and Meeting to modify/delete",
        el : '.orgMeetingForm',
      });
      this.meetingForm.render();
    },
    renderMeeting : function(orgId, meetingId) {
      this.meetingInfo = new MeetingModel({orgId: orgId, meetingId : meetingId});
      this.meetingModel = this.user.get('organizations').get(orgId).get('meetings').get(meetingId);
      var that = this;
      this.meetingInfo.fetch({
        success : function(results) {
          var context = that.meetingInfo.toJSON();
          context.writePerm = that.user.get('organizations').get(orgId).toJSON().writePerm;
          that.$el.find("#meetingInfo").html(templates['meetings/info'](context));
        },
        error : function() {
          alert("Could not fetch meeting info :(");
        }
      });
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
        //remove meeting info, as no org->meeting selected
        this.$el.find("#meetingInfo").empty();
        
      } else {
        this.renderMeeting(orgId, meetingId);
      }
    },
    deleteMeeting : function() {
      var meeting = this.$el.find('.meeting-dropdown');
      var meetingId = meeting.val();
      var meetingName = meeting.find('option:selected').text();
      
      var org = this.$el.find('.organization-dropdown');
      var orgId = org.val();
      var orgName = org.find('option:selected').text();

      var that = this;
      this.user.get('organizations').get(orgId).get('meetings').get(meetingId).destroy({
        success : function(result) { //remove meeting from user model as well            
          that.render();
          that.$el.find("#alertInformation").html(templates['meetings/removed']({
            orgName : orgName,
            meetingName: meetingName
          }));
        },
        error: function(result, s) {
          alert("Error, could not delete meeting :(");
        }
      });
    },
    saveMeeting : function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var meetingDropdown = this.$el.find('.meeting-dropdown');
      var meetingId = meetingDropdown.val();

      var orgDropdown = this.$el.find('.organization-dropdown');
      var orgId = orgDropdown.val();
      
      var that = this;
      this.user.get('organizations').get(orgId).get('meetings').get(meetingId).save({
        'name' : this.$el.find('#meetingName').val(),
        'onCheckIn' : this.$el.find("#onCheckIn").val()
      },
      {
        success : function(res) {
          //remove previous alert
          that.render();
          that.$el.find('.organization-dropdown').val(orgId);
          //it expects an event
          that.meetingForm.organizationChanged({ target : { value : orgId } });
          that.$el.find('.meeting-dropdown').val(meetingId);
          that.meetingChanged();
          that.$el.find("#alertInformation").html(templates['meetings/saved']());
          //fadeout in 3 secs
          setTimeout(function() {
            that.$el.find('.savedMeetingAlert').fadeOut();
          }, 2000);
        },
        error: function(result, s) {
          alert("Error, could not save meeting changes :(");
        }
      });
    },
    remove : function() {
      this.stopListening();
      this.meetingForm.remove();
      this.vent.off("post:orgMeetingForm");
      this.$el.html('');
    }
  });
  return MeetingsView;
});