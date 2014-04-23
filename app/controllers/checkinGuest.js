define(["jquery", "backbone", "views/errorPage", "views/checkInGuest"],
function($,        Backbone,   ErrorPage       ,  CheckInGuestView) {
  var CheckInGuestController = function(options) {
    this.app = options.app;
    this.user = options.user;
    this.organization = this.user.get('organizations').get(options.orgId);
    try {

      this.meeting = this.organization.get("meetings").get(options.meetingId);
      if(typeof this.meeting === 'undefined') { throw new Error("Undefined meeting"); }
      
    } catch(e) {
      (new ErrorPage()).render("Could not load meeting Id: " + options.meetingId + " For organization: " + options.orgId);
    }
    this.app.views.current = new CheckInGuestView({
      user : this.user,
      vent : this.vent,
      organization : this.organization,
      meeting : this.meeting
    });
    this.app.views.current.render();
  };
  return CheckInGuestController;
});