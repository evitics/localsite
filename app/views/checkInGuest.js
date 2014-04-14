define(['jquery', 'backbone', 'templates', 'collections/checkIns'],
function($,        Backbone,   templates ,  CheckInCollection    ) {
  var CheckinGuestView = Backbone.View.extend({
    el : '.site-content',
    events : {
      "submit #checkinAGuest" : "checkinAGuest"
    },
    initialize: function(options) {
      this.meeting = options.meeting;
      this.organization = options.organization;
      
      //Create checkinCollection      
      var params = {};
      params.meetingId = this.meeting.get('meetingId');
      params.orgId = this.organization.get('orgId');
      
      this.checkInCollection = new CheckInCollection(params);
      this.listenTo(this.checkInCollection, 'reset add change remove', this.renderCheckin, this);

    },
    render : function() {
      var context = {
        meeting : this.meeting.toJSON(),
        organization : this.organization.toJSON()
      };
      this.$el.html(templates['checkinGuest/wrapper'](context));
      //Save the guestId input, as we'll be accessing it alot.
      this.guestIdInput = this.$el.find("#guestId");
      this.guestIdInput.focus(); //Autofocus on this input
      //Get the current checkins
      this.checkInCollection.fetch();
    },
    //Renders the checkins whenever checkInCollection is fetched
    renderCheckin : function(checkInCollection) {
      debug = checkInCollection;
      debug2 = this.checkInCollection;
      var html = '';
      //See if any errors, warning, or if successful (under res property) 
      var res = checkInCollection.get('res');
      if(res && res.hasOwnProperty("success")) {
        html += templates['checkinGuest/success'](res.success);
      }
      if(res && res.hasOwnProperty("error")) {
        html += templates['checkinGuest/error'](res.error);
      }
      if(res && res.hasOwnProperty("warning")) {
        html += templates['checkinGuest/warning'](res.warning);
      }
      //render previous results
      html += templates['checkinGuest/checkIns'](checkInCollection.toJSON());
      this.$el.find("#checkedinGuests").html(html);
    },
    checkinAGuest : function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      //check in user
      this.checkInCollection.checkInUser(this.guestIdInput.val());

      //Reset input
      this.guestIdInput.val('');

    },
    remove : function() {
      this.stopListening();
      this.undelegateEvents();
      this.$el.off("#checkinAGuest");
      this.$el.html('');
    }
  });
  return CheckinGuestView;
});