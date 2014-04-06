define(['jquery', 'backbone', 'templates'],
function($,        Backbone,   templates) {
  var LogView = Backbone.View.extend({
    initialize: function(options) {
      //  orgId and meetingId are required
      if(!options.hasOwnProperty('orgId')) {
        throw new Error('orgId is a required parameter');
      }
      if(!options.hasOwnProperty('meetingId')) {
        throw new Error('meetingId is a required parameter');
      }

      // Save params,
      for(var key in options) {
        this[key] = options[key];
      }

    },
    render : function() {
      
    }
  });
  return LogView;
});