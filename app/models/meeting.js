define(['backbone', 'views/errorPage'],
function(backbone ,  ErrorPage       ) {
  var MeetingModel = Backbone.Model.extend({
    idAttribute : 'meetingId',
    initialize : function(options) {
      if(typeof options.orgId === "undefined") {
        throw new Error("orgId not specified");
      }
      if(typeof options.meetingId !== "undefined") {
         this.meetingId = options.meetingId;
      }
      this.orgId = options.orgId;
    },
    urlRoot : function() {

      return '/api/meeting/' + this.orgId;
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