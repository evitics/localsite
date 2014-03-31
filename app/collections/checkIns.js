define(['backbone', 'views/errorPage'],
function(backbone ,  ErrorPage       ) {
  var CheckInCollection = Backbone.Model.extend({
    initialize: function(options) {
      //Check that required params given
      if(typeof options.orgId === "undefined") {
        throw new Error("Organization Id not specified");
      }
      if(typeof options.meetingId === "undefined") {
        throw new Error("Meeting Id is not specified");
      }

      //Bind Params
      this.orgId = options.orgId;
      this.meetingId = options.meetingId;
      this.userId = options.userId;

    },
    type: "POST",
    url : function() {
      var output = '/api/checkin/' + this.orgId + '/' + this.meetingId;
      if(this.userId) {
        output += '/' + this.userId;
      }
      return output;
    },
    checkInUser : function(userId) {
      if(typeof userId === "undefined") {
        throw new Error("No userId specified");
      }
      this.userId = userId;
      this.fetch({data: {userId: userId}, type: "POST", reset:true});
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
  return CheckInCollection;
});