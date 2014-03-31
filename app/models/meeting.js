define(['backbone'],
function(backbone) {
  var MeetingModel = Backbone.Model.extend({
    idAttribute : 'meetingId',
    initialize : function(options) {
      if(typeof options.meetingId === "undefined") {
        throw new Error("meetingId not specified");
      }
      if(typeof options.orgId === "undefined") {
        throw new Error("orgId not specified");
      }
      this.meetingId = options.meetingId;
      this.orgId = options.orgId;
      this.meetings = options.meetings;
    },
    url : function() {
      return '/api/meeting/' + this.orgId + '/' +this.meetingId;
    }
  });
  return MeetingModel;
});