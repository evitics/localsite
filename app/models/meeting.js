define(['backbone', 'views/errorPage'],
function(backbone ,  ErrorPage       ) {
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
    },
    parse : function(res) {
      if(res.hasOwnProperty("error")) {
        ( new ErrorPage() ).render(res.error);
        return false;
      } else {
        return res;
      }
    }
  });
  return MeetingModel;
});