define(['jquery', 'backbone', 'templates', 'views/orgMeetingForm'],
function($,        Backbone,   templates,   OrgMeetingForm) {
  var HomeView = Backbone.View.extend({
    el : '.site-content',
    events : {
    },
    initialize: function(options) {
     if(!options.hasOwnProperty('user')) {
        throw new Error("No user model specified");
      }
      if(!options.hasOwnProperty('vent')) {
        throw new Error("No vent property specified");
      }
      this.user = options.user;
      this.vent = options.vent;
      this.app = options.app;
      this.bindVents();
    },
    bindVents : function() {
      //pass vent to controller
      var that = this;
      this.vent.bind("post:orgMeetingForm", function(post) {
        that.vent.trigger("post:startMeeting", post);
      });
    },
    render : function() {
      this.$el.html(templates['home/main']());
      this.meetingForm = new OrgMeetingForm({
        user: this.user,
        vent: this.vent,
        headerTXT : "Start a Meeting",
        submitButtonTXT : "Start Meeting",
        el : '.orgMeetingForm'
      });
      this.meetingForm.render();
    },
    remove : function() {
      this.meetingForm.remove();
      this.unBindVents();
      this.stopListening();
      this.undelegateEvents();
      this.$el.html('');
    },
    unBindVents : function() {
      this.vent.off("post:orgMeetingForm");
    }
  });
  return HomeView;
});