define(['backbone', 'models/meeting', 'views/errorPage'],
function(backbone ,  MeetingModel   ,  ErrorPage       ) {
  var MeetingCollection = Backbone.Collection.extend({
    model :  MeetingModel,
    initialize: function(options) {
      this.meetings = options.meetings;
    },
    url : '/api/organizations',
    parse : function(res) {
      if(res.hasOwnProperty("error")) {
        ( new ErrorPage() ).render(res.error);
        return false;
      } else {
        return res;
      }
    }
  });
  return MeetingCollection;
});