define(['jquery', 'backbone', 'templates', 'views/orgMeetingForm'],
function($,        Backbone,   templates ,  OrgMeetingForm       ) {
  var CheckinTotals = Backbone.View.extend({
    el : '.site-content',
    events: {
      'change .meeting-dropdown' : 'meetingChanged',
      'change .organization-dropdown' : 'meetingChanged' //whenever org changes, default meeting selected
    },
    initialize: function(options) {
      if(!options.hasOwnProperty("user")) {
        throw new Error("Analytics view requires the user model to be passed");
      }
      if(!options.hasOwnProperty("vent")) {
        throw new Error("Analytics view requires the vent to be passed");
      }
      this.user = options.user;
      this.vent = options.vent;
    },
    render : function() {
      this.$el.html(templates['analytics/wrapper'](this.user.toJSONR()));
      this.meetingForm = new OrgMeetingForm({
        user: this.user,
        vent: this.vent,
        headerTXT : "What to view analytics for?",
        submitButtonTXT : "View Analytics",
        el : '.orgMeetingForm'
      });
      this.meetingForm.render();
      //remove 'view analytics button, as its un-needed'
      this.$el.find(".orgMeetingForm button.submit").parent().parent().remove();
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
        //remove our total graph
        this.$el.find("#analyticsData").empty();
        
      } else {
        this.renderTotals(orgId, meetingId);
      }
    },
    renderTotals : function(orgId, meetingId) {
      var that = this;
      $.get('/api/log/' + orgId + '/' + meetingId)
        .fail(function() {
          alert("Error: Could not fetch data");
        })
        .done(function(data) {
          if(data.hasOwnProperty('error')) {
            that.$el.find("#analyticsData").html("<p>No Checkin Data for this meeting</p>");
            return;
          }
          that.$el.find("#analyticsData").html(templates['analytics/total/index']());
          var html = '';
          var context = {
            orgId : orgId,
            meetingId : meetingId
          };
          for(var year in data) {
            context.year = year;
            html += '<tbody class="year">';
            html += templates['analytics/total/yearRow'](context);
            for(var month in data[year]) {
              context.month = month;
              html += '</tbody><tbody class="month">';
              html += templates['analytics/total/monthRow'](context);
              for(var day in data[year][month]) {
                if(day == 'total') {
                  context.isTotal = true;
                } else {
                  context.isTotal = false;
                }
                context.day = day;
                context.value = data[year][month][day];
                html+= templates['analytics/total/dayRow'](context);
              }
            }
            html +='</tbody>';
          }
          that.$el.find("table#analyticsTotals").append(html);
          that.$el.find("#analyticsData").append(templates["analytics/total/downloadButtons"]({
            orgId : orgId,
            meetingId : meetingId
          }));
        });
    },
    remove : function() {
      this.meetingForm.remove();
      this.stopListening();
      this.undelegateEvents();
      this.vent.off("post:orgMeetingForm");
      this.$el.html('');
    }
  });
  return CheckinTotals;
});