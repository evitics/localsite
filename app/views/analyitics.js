define(['jquery', 'backbone', 'templates', 'views/orgMeetingForm'],
function($,        Backbone,   templates ,  OrgMeetingForm       ) {
  var HomeView = Backbone.View.extend({
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
      if(isNaN(meetingId) || isNaN(orgId)) {
        return; //do nothing as we dont have a meetingId->orgId combo
      } else {
        this.renderTotals(orgId, meetingId);
      }
    },
    renderTotals : function(orgId, meetingId) {
      var model = {
        res : {
          total: 2352,
          page : 1
        },
        hits : {
          2014 : {
            January : {
              1 : 23,
              5 : 25,
              8 : 29,
              total : 77
            },
            February : {
              20 : 20,
              22 : 35,
              total : 55
            },
          },
          2013 : {
            December : {
              1 : 25,
              total : 25
            },
          }
        }
      };
      this.$el.append(templates['analytics/total/index'](context));
      var html = '';
      var hits = model.hits;
      var context = {
        orgId : orgId,
        meetingId : meetingId
      };
      for(var year in hits) {
        context.year = year;
        html += templates['analytics/total/yearRow'](context);
        for(var month in hits[year]) {
          context.month = month;
          html+= templates['analytics/total/monthRow'](context);
          for(var day in hits[year][month]) {
            context.day = day;
            context.value = hits[year][month][day];
            html+= templates['analytics/total/dayRow'](context);
          }
        }
      }
      this.$el.find("#analyticsTotals tbody").html(html);
    },
    remove : function() {
      this.stopListening();
      this.vent.off("post:orgMeetingForm");
      this.$el.html('');
    }
  });
  return HomeView;
});