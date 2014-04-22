define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

Handlebars.registerPartial("example-partial", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class='post'>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n";
  return buffer;
  }));

Handlebars.registerPartial("newMeetingModal", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"newMeetingModal\" class=\"reveal-modal\" data-reveal>\n  <form id=\"createNewMeeting\" data-abide=\"ajax\">\n    <div class=\"row collapse\">\n      <h3>Create A New Meeting</h3>\n        <label>* Name of the Meeting\n          <input type=\"text\" placeholder=\"My Super Cool Group Meeting\" required pattern=\"^[a-zA-Z0-9\\s]+$\" class=\"meetingName\">\n        </label>\n        <small class=\"error\">Can only use alpha numeric characters</small>\n    </div>\n    <div class=\"row collapse\">\n      <label>Send Email when guest checks in?\n      <select class=\"sendEmailOnCheckin\">\n        <option value=\"false\">Don't send any email</option>\n        <option value=\"all\">All Guests</option>\n        <option value=\"new\">Guests new to organization</option>\n      </select>\n    </div>\n    <div class=\"row collapse triggers\" style=\"display:none;\">\n      <div class=\"row\">\n        <label>To:\n          <input id=\"email-to\" type=\"text\" value=\"{{guest.email}}\">\n        </label>\n      </div>\n      <div class=\"row\">\n        <label>From:\n          <input id=\"email-from\" type=\"text\" placeholder=\"{{organization.email}}\">\n        </label>\n      </div>\n      <div class=\"row\">\n        <label>Subject:\n          <input id=\"email-subject\" type=\"text\" placeholder=\"{{organization.name}} welcomes you to {{meeting.name}}\">\n        </label>\n      </div>\n      <div class=\"row\">\n        <label>Message:\n          <textarea id=\"email-message\" style=\"height:9rem;\">\nHi {{guest.name.first}} {{guest.name.last}},\n\nHope you had fun at {{organization.name}}'s event.  We sure did!.\n\nCordially,\n{{organization.name}}\n         </textarea>\n        </label>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"large-12 columns\">\n        <button class=\"createAMeeting\" type=\"submit\">Create</button>\n      </div>\n    </div>\n  </form>\n  <a class=\"close-reveal-modal\">&#215;</a>\n</div>";
  return buffer;
  }));

this["templates"]["404"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n  <div class=\"small-12 columns\">\n    <h1>404: Something Went Wrong</h1>\n    <h4>";
  if (helper = helpers.errMsg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.errMsg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n  </div>\n</div>";
  return buffer;
  });

this["templates"]["analytics/log"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " \n  <tr>\n    <td>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    </td></td>\n    <td></td>\n    <td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n  </tr>\n";
  return buffer;
  }

  buffer += "<table>\n  <tr>\n    <th>Year</th>\n    <th>Month</th>\n    <th>Day</th>\n    <th>Total</th>\n  </tr>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.hits), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n</table>";
  return buffer;
  });

this["templates"]["analytics/total/dayRow"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n      total\n    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <a href=\"/api/log/download/";
  if (helper = helpers.orgId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.meetingId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.meetingId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.year) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.year); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.month) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.month); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.day) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.day); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" download>";
  if (helper = helpers.day) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.day); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n    ";
  return buffer;
  }

  buffer += "<tr>\n  <td></td>\n  <td></td>\n  <td>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isTotal), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </td>\n  <td>";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n</tr>";
  return buffer;
  });

this["templates"]["analytics/total/downloadButtons"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row collapse text-center\">\n  <div class=\"medium-6 columns\">\n    <h4>Raw Meeting Log</h4>\n    <a class=\"button\" href=\"/api/log/download/";
  if (helper = helpers.orgId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.meetingId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.meetingId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" download>CSV</a>\n  </div>\n  <div class=\"medium-6 columns text-center\">\n    <h4>Raw Organization Log</h4>\n    <a class=\"button\" href=\"/api/log/download/";
  if (helper = helpers.orgId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" download>CSV</a>\n  </div>\n</div>\n\n";
  return buffer;
  });

this["templates"]["analytics/total/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<table id=\"analyticsTotals\" class=\"pivotTable\" style=\"max-width:800px; width:100%; margin:0 auto;\"> \n<thead>\n  <tr>\n    <th>Year</th>\n    <th>Month</th>\n    <th>Day</th>\n    <th>Total</th>\n  </tr>\n</thead>\n</table>";
  });

this["templates"]["analytics/total/monthRow"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"monthHeader\">\n  <td></td>\n  <td colspan=\"3\">\n    <a href=\"/api/log/download/";
  if (helper = helpers.orgId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.meetingId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.meetingId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.year) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.year); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.month) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.month); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" download>";
  if (helper = helpers.month) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.month); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n  </td>\n</tr>";
  return buffer;
  });

this["templates"]["analytics/total/yearRow"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"yearHeader\">\n  <td colspan=\"4\"><a href=\"/api/log/download/";
  if (helper = helpers.orgId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.meetingId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.meetingId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.year) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.year); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\" download>";
  if (helper = helpers.year) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.year); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></td>\n</tr>";
  return buffer;
  });

this["templates"]["analytics/wrapper"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"analyticsWrapper\" class=\"small-12 columns\">\n  <section class=\"orgMeetingForm\" class=\"row collapse\">\n  </section>\n  <div id=\"analyticsData\" class=\"row collapse\">\n  </div>\n</div>";
  });

this["templates"]["checkinGuest/checkIns"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <div class=\"row collapse\">\n          <h5>\n            ";
  if (helper = helpers.timestamp) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.timestamp); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.name)),stack1 == null || stack1 === false ? stack1 : stack1.full)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isNew), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </h5>\n        </div>\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " <img src=\"/app/img/new-icon.png\" width=\"25px\" height=\"25px\"> ";
  }

  buffer += "<div class=\"row collapse\">\n  <div class=\"large-4 columns\">\n    <div class=\"row collapse\">\n      <h3>Statistics</h3>\n      <ul>\n        <li>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.statistics)),stack1 == null || stack1 === false ? stack1 : stack1.attendance)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Guests Atending</li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"large-8 columns\">\n    <h3>Checkedin Guests:</h3>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.checkins), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;
  });

this["templates"]["checkinGuest/error"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-alert=\"\" class=\"alert-box alert round\">\n  "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n</div>";
  return buffer;
  });

this["templates"]["checkinGuest/success"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-alert=\"\" class=\"alert-box success round\">\n  "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n</div>";
  return buffer;
  });

this["templates"]["checkinGuest/warning"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div data-alert=\"\" class=\"alert-box warning round\">\n  "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n</div>";
  return buffer;
  });

this["templates"]["checkinGuest/wrapper"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"checkinGuest\" class=\"small-12 columns\">\n  <h3>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.organization)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.meeting)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n  <form id=\"checkinAGuest\">\n    <div class=\"row\">\n      <div class=\"small-12 columns\">\n        <label>Input Guest Id (GTID or GT-Username):\n          <input type=\"text\" id=\"guestId\" type=\"text\" placeholder=\"E.g: 902634095 or gburdell3\" autofocus=\"autofocus\">\n        </label>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div class=\"small-12 columns\" id=\"checkedinGuests\">\n\n</div>";
  return buffer;
  });

this["templates"]["example"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li>";
  stack1 = self.invokePartial(partials['example-partial'], 'example-partial', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;
  }

  buffer += "<h2>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n<ul>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.posts), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n";
  return buffer;
  });

this["templates"]["forms/orgMeeting/alert"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div data-alert=\"\" class=\"alert-box alert\">\n    ";
  if (helper = helpers.error) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.error); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n  </div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div data-alert=\"\" class=\"alert-box success\">\n    Created meeting: ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ", for organization ";
  if (helper = helpers.orgName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n  </div>\n";
  return buffer;
  }

  buffer += "<div class=\"alertBox\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["templates"]["forms/orgMeeting/layout"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isPending), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n       ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          <option value=\"";
  if (helper = helpers.orgId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.short_name), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </option>\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n              ";
  if (helper = helpers.short_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.short_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n              ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div class=\"row\">\n    <div class=\"small-12 columns\">\n      <button type=\"submit\" class=\"button submit\" disabled=\"true\">";
  if (helper = helpers.submitButtonTXT) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.submitButtonTXT); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</button>\n    </div>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<section id=\"orgMeetingAlert\">\n</section>\n<h3>";
  if (helper = helpers.headerTXT) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.headerTXT); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n<form class=\"orgMeeting\">\n  <div class=\"row collapse\">\n    <label>Organization</label>\n    <div class=\"small-10 medium-11 columns\">\n      <select class=\"organization-dropdown\">\n        <option value=\"\">--Please Select One--</option>\n       ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.organizations), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </select>\n    </div>\n    <div class=\"small-1 small-pull-1 medium-1 medium-pull-0 columns\">\n      <a class=\"button postfix secondary joinAnOrganization\" href=\"/organizations\" style=\"min-width:3em;\">+</a>\n    </div>\n  </div>\n\n  <div class=\"row collapse\">\n    <label>Meeting Name</label>\n    <div class=\"small-10 medium-11 columns\">\n      <select disabled=\"disabled\" class=\"meeting-dropdown\">\n        \n      </select>\n    </div>\n    <div class=\"small-1 small-pull-1 medium-1 medium-pull-0 columns\">\n      <a class=\"disabled button postfix secondary revealNewMeetingModal\" style=\"min-width:3em\">+</a>\n    </div>\n  </div>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.submitButtonTXT), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</form>\n\n";
  stack1 = self.invokePartial(partials.newMeetingModal, 'newMeetingModal', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  });

this["templates"]["forms/orgMeeting/meetings"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <option value=\"";
  if (helper = helpers.meetingId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.meetingId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["templates"]["help"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<style>\n  .help-page section {\n    padding-top:3rem;\n    background-colors:green;\n  }\n</style>\n\n<div class=\"help-page\">\n<h2>FAQ:</h2>\nHelp and FAQs\n<h4>Table of Contents</h4>\n<ul>\n  <li><a href=\"#email-context\">Email Templiting</a>\n    <ul>\n      <li><a href=\"#email-context-howto\">How to write templates</a></li>\n      <li><a href=\"#email-context-fields\">Available Fields</a></li>\n      <li><a href=\"#email-context-porting\">Porting email templates from thunderbird to evitics</a></li>\n    </ul>\n  </li>\n  <li><a href=\"#unabletologin\">Unable to login</a></li>\n  <li><a href=\"#nonews\">No news on your homepage</a></li>\n  <li><a href=\"#validUserIds\">What is a valid user id</a></li>\n  <li><a href=\"#joinRequest\">My organization join request has yet to go through</a></li>\n  <li><a href=\"#analyticsTypes\">What types of analytics are preformed</a></li>\n  <li><a href=\"#whoStartsCheckin\">Who starts the checkin process</a></li>\n  <li><a href=\"#contact\">Contact Us</a></li>\n</ul>\n<div id=\"email-context\">\n  <h3>Email Templeting</h3>\n  <section id=\"email-context-howto\">\n    <h4>How to write an email template</h4>\n    <p>\n      Lets start out with an example.  If you want to write a template personally addressed to each guest that checks in, you would use "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.guest)),stack1 == null || stack1 === false ? stack1 : stack1.name)),stack1 == null || stack1 === false ? stack1 : stack1.full)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".  Take the following message for example:\n      <pre><code>\n        Hi George Burdell,\n        \n        Hope you had fun today!\n      </code></pre>\n      To make this email dynamically addressed you would write the following:\n      <pre><code>\n        Hi {{guest.name.first}} {{guest.name.last}},\n\n        Hope you had fun today!\n      </code></pre>\n      Now, Handlebars will insert the guest's first name and last name into both <code>{{ }}</code> cells\n    </p>\n  </section>\n  <section id=\"email-context-fields\">\n    <h4>Available Fields</h4>\n    <a href=\"http://handlebarsjs.com/\">Handlebars.js Documentation</a>\n    <ul>\n      <li>\n        <h4>Meeting</h4>\n        <ul>\n          <li>{{meeting.name}}</li>\n          <li>{{meeting.id}}</li>\n        </li>\n      </li>\n      <li>\n        <h4>Organization</h4>\n        <ul>\n          <li>Always Available\n            <ul>\n              <li>{{organization.id}}</li>\n              <li>{{organization.name}}</li>\n              <li>{{organization.description}}</li>\n              <li>{{organization.dues}}</li>\n              <li>{{organization.logoURL}}</li>\n            </ul>\n          </li>\n          <li>Available if organization provided them to JacketPages\n            <ul>\n              <li>{{organization.abbreviation}}</li>\n              <li>{{organization.website}}</li>\n              <li>{{organization.phone}}</li>\n              <li>{{organization.email}}</li>\n              <li>{{organization.fax}}</li>\n              <li>{{organization.annualEvents}}</li>\n              <li>{{organization.created}}</li>\n              <li>{{organization.elections}}</li>\n              <li>{{organization.meetingInformation}}</li>\n              <li>{{organization.meetingFrequency}}</li>\n            </ul>\n          </li>\n        </ul>\n      </li>\n      <li>\n        <h4>Guest</h4>\n        <ul>\n          <li>{{guest.username}}</li>\n          <li>{{guest.curriculum}}</li>\n          <li>{{guest.email}}</li>\n          <li>{{guest.phone}}</li>\n          <li>{{guest.affiliation}}</li>\n          <li>{{guest.name.first}}</li>\n          <li>{{guest.name.last}}</li>\n          <li>{{guest.name.middle}}</li>\n          <li>{{guest.name.full}}</li>\n        </ul>\n      </li>\n    </ul>\n  </section>\n</div>\n\n<section id=\"unabletologin\">\n  <h4>Unable to login</h4>\n  <p>\n    Q: I am unable to log in to the website. I have tried logging in multiple times on different occasions but it does not seem to work for me.\n  </p>\n  <p>\n    A: This website uses Georgia Tech’s CAS login service. The username and password for the website is the same one you use for other Georgia Tech resources. If you are able to log in successfully to T-Square or Buzzport, you should be able to log into the website as well. If you have changed your password recently, please allow the website up to 3 hours to get the updated credentials. if you still run into issues, you should contact Georgia Tech’s OIT: www.oit.gatech.edu\n  </p>\n</section>\n\n<section id=\"nonews\">\n  <h4>No news on your homepage</h4>\n  <p>\n    Q: I don’t see anything under the News section when I log in. What could be wrong?\n  </p>\n  <p>\n    A: There will be nothing under News section if you have not joined any organization yet or the organizations you are the part of have no updates.\n  </p>\n</section>\n\n<section id=\"validUserIds\">\n  <h4>What is a valid user id</h4>\n  <p>\n    Q: What can I use to check-in people for a meeting?\n  </p>\n  <p>\n    A: You can check-in people using their GTID or GT username. You can also use Buzzcard to check-in people if you are using our RFID reader.\n  </p>\n</section>\n\n<section id=\"joinRequest\">\n  <h4>My organization join request has yet to go through</h4>\n  <p>\n    Q: I have requested to join an organization but I don’t see it under my organization in the Organization page. When will I see the new organization?\n  </p>\n  <p>\n    A: You are unable to see your requested organization under your organization because your request is still pending with the organization’s administrator. Once they approve your pending request only then you will be able to see the organization under My Organization.\n  </p>\n</section>\n\n<section id=\"analyticsTypes\">\n  <h4>What types of analytics are preformed</h4>\n  <p>\n    Q: What type of analytics do you perform?\n  </p>\n  <p>\n    A: We provide the ability for the user to see the logs of check-ins for the meetings as well as the organization for the past day, month, and year and you can download the file in .csv format as well.\n  </p>\n</section>\n\n<section id=\"whoStartsCheckin\">\n  <h4>Who starts the checkin process</h4>\n  <p>\n    Q: Who all can start the check-in process for a meeting?\n  </p>\n  <p>\n    A: Any member who is a part of the organization can start the check-in process for a meeting.\n  </p>\n</section>\n\n<section id=\"contact\">\n  <h4>Contact Us</h4>\n  <p>\n    If you have any more questions, please feel free to email us at eventanalytics@lists.gatech.edu\n  </p>\n</section>\n\n</div>";
  return buffer;
  });

this["templates"]["home/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section id=\"main/startMeetingForm\" class=\"large-6 large-push-6 columns fixed-top-right orgMeetingForm\">\n  \n</section>\n<section id=\"news\" class=\"large-6 large-pull-6 columns\">\n  <h3>News</h3>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>IEEE</h4>\n      <p>10 New Members</p>\n      <p>1/20 - 200 members at general Meeting</p>\n      <p>1/19 - 15 members at Hardware Meeting</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n</section>\n";
  });

this["templates"]["loading"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h3>";
  if (helper = helpers.msg) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.msg); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n";
  return buffer;
  });

this["templates"]["marketing/emailForm"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"marketingEmailForm\">\n  <div class=\"row collapse\">\n    <label>To:\n      <input id=\"marketing-emailTo\" type=\"text\" value=\"";
  if (helper = helpers.emailTo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailTo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" required>\n    </label>\n  </div>\n  <div class=\"row collapse\">\n    <label>From:\n      <input id=\"marketing-emailFrom\" type=\"text\" value=\"";
  if (helper = helpers.emailFrom) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailFrom); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" required>\n    </label>\n  </div>\n  <div class=\"row collapse\">\n    <label>Subject:\n      <input id=\"marketing-emailSubject\" type=\"text\" value=\"";
  if (helper = helpers.emailSubject) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailSubject); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" required>\n    </label>\n  </div>\n  <div class=\"row collapse\">\n    <label>Message:\n      <textarea id=\"marketing-emailMessage\" style=\"height:9rem;\" required>";
  if (helper = helpers.emailMessage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailMessage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n    </label>\n  </div>\n  <div class=\"row collapse\">\n    <input type=\"submit\" class=\"button\" value=\"Send Emails\">\n  </div>\n</form>\n\n<div id=\"emailStatusModal\" class=\"reveal-modal\" data-reveal>\n  <h2>Sending Emails</h2>\n  <div class=\"progress\">\n    <span id=\"emailProgressBar\" class=\"meter\" style=\"width: 1%\"></span>\n  </div>\n  <a class=\"close-reveal-modal\">&#215;</a>\n</div>";
  return buffer;
  });

this["templates"]["marketing/wrapper"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"#marketing-wrapper\" class=\"small-12 columns\">\n  <section class=\"orgMeetingForm\" class=\"row collapse\">\n  </section>\n  <section id=\"alertInformation\" class=\"alert-box\" data-alert style=\"display:none\">\n  </section>\n  <section id=\"marketingEmailFormWrapper\" class=\"row collapse\">\n  </section>\n</div>";
  });

this["templates"]["meetings/info"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n<form id=\"saveMeeting\">\n  <div class=\"row\">\n    <label>Meeting Name:\n      <input type=\"text\" id=\"meetingName\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" style=\"font-size:1.5em; height:2em;\">\n    </label>\n  </div>\n  <div class=\"row collapse\">\n    <label>Send Email when guest checks in?\n    <select id=\"modify-sendEmailOnCheckin\">\n      <option value=\"false\">Don't send any email</option>\n      <option value=\"all\">All Guests</option>\n      <option value=\"new\">Guests new to organization</option>\n    </select>\n  </div>\n  <div class=\"row collapse modify-triggers\" style=\"display:none;\">\n    <div class=\"row\">\n      <label>To:\n        <input id=\"modify-email-to\" type=\"text\" value=\"";
  if (helper = helpers.emailTo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailTo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n      </label>\n    </div>\n    <div class=\"row\">\n      <label>From:\n        <input id=\"modify-email-from\" type=\"text\" value=\"";
  if (helper = helpers.emailFrom) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailFrom); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" placeholder=\"gburdell3@gatech.edu\">\n      </label>\n    </div>\n    <div class=\"row\">\n      <label>Subject:\n        <input id=\"modify-email-subject\" type=\"text\" value=\"";
  if (helper = helpers.emailSubject) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailSubject); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n      </label>\n    </div>\n    <div class=\"row\">\n      <label>Message:\n        <textarea id=\"modify-email-message\" style=\"height:9rem;\">";
  if (helper = helpers.emailMessage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.emailMessage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n      </label>\n    </div>\n  </div>\n  <div class=\"row\">\n    <input class=\"button save\" type=\"submit\" value=\"Save\">\n    <button class=\"delete\">Delete</button>\n  </div>\n</form>\n\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n  <div data-alert class=\"alert-box alert\">\n    You do not have write permissions for this oganization.  Therefore you cannot not modify/delete this meeting.\n  </div>\n";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.writePerm), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["templates"]["meetings/removed"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += " <div data-alert class=\"alert-box success\">\n    Meeting: ";
  if (helper = helpers.meetingName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.meetingName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " has been successfully removed from Organization: ";
  if (helper = helpers.orgName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n</div>";
  return buffer;
  });

this["templates"]["meetings/saved"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div data-alert class=\"alert-box success savedMeetingAlert\">\n    Meeting was saved\n</div>";
  });

this["templates"]["meetings/wrapper"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"meetingsWrapper\" class=\"small-12 columns\">\n  <section class=\"orgMeetingForm\" class=\"row collapse\">\n  </section>\n  <section id=\"alertInformation\">\n  </section>\n  <section id=\"meetingInfo\" class=\"row collapse\">\n  </section>\n</div>";
  });

this["templates"]["nav/leftOffCanvas"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ul class=\"off-canvas-list\">\n  <li><label>Evitics</label></li>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n  <li><a href=\"/\">Home</a></li>\n  <li><a href=\"/organizations\">Organizations</a></li>\n  <li><a href=\"/meetings\">Meetings</a></li>\n  <li><a href=\"/analytics\">Analyitics</a></li>\n  <li><a href=\"/marketing\">Marketing</a></li>\n  <li><a href=\"/help\">Help</a></li>\n  <li><a href=\"https://login.gatech.edu/cas/logout\">Logout</a></li>\n</ul>\n";
  return buffer;
  });

this["templates"]["nav/topBar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"title-area\">\n  <li class=\"name\">\n    <h1><a href=\"/\">Evitics</a></h1>\n  </li>\n</ul>\n<section class=\"top-bar-section\"> \n  <ul class=\"right\">\n    <li class=\"divider\"></li>\n    <li><a href=\"/organizations\">Organizations</a></li>\n\n    <li class=\"divider\"></li>\n    <li><a href=\"/meetings\">Meetings</a></li>\n\n    <li class=\"divider\"></li>\n    <li><a href=\"/analytics\">Analytics</a></li>\n\n    <li class=\"divider\"></li>\n    <li><a href=\"/marketing\">Marketing</a></li>\n        \n    <li class=\"divider\"></li>\n    <li><a href=\"/help\">Help</a></li>\n\n    <li class=\"active\"><a href=\"https://login.gatech.edu/cas/logout\">Logout</a></li>\n  </ul> \n  <!-- Left Nav Section --> \n  <ul class=\"left\">\n  </ul>\n</section>";
  });

this["templates"]["organization/info"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n        <button class=\"alert leaveOrg\">Leave Organization</button>\n      ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.requestPending), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\n          <button class=\"disabled\">Request Pending</button>\n        ";
  }

function program6(depth0,data) {
  
  
  return "\n          <button class=\"joinOrg\">Join Organization</button>\n        ";
  }

  buffer += "<section id=\"orgInformation\" class=\"small-12 columns\">\n  <div class=\"row collapse\">\n      <h2><img class=\"org-logo\" src=\"";
  if (helper = helpers.logo_path) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.logo_path); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></img>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n  </div>\n  <div class=\"row collapse\">\n    <div class=\"small-12\">\n      <p>\n        ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n      </p>\n    </div>\n  </div>\n  <div class=\"row collapse\">\n    <div class=\"small-12\">\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.joined), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</section>\n<section id=\"orgPermissions\" class=\"small-12 columns\">\n  \n</section> ";
  return buffer;
  });

this["templates"]["organization/list/item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        ";
  if (helper = helpers.short_name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.short_name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n      ";
  return buffer;
  }

  buffer += "<li>\n  <a class=\"th\" href=\"/organizations/";
  if (helper = helpers.orgId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.orgId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    <h4>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.short_name), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </h4>\n    <img src=\"";
  if (helper = helpers.logo_path) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.logo_path); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></img>\n  </a>\n</li>";
  return buffer;
  });

this["templates"]["organization/list/wrapper"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"small-12 columns organization-list\">\n  <section id=\"myOrganizations\" class=\"row collapse\">\n    <h3>My Organizations:</h3>\n    <ul class=\"myOrganizationList small-block-grid-2 medium-block-grid-5 large-block-grid-6\">\n    \n    </ul>\n  </section>\n\n  <section id=\"otherOrganizations\" class=\"row collapse\">\n    <h3>Other Organizations:</h3>\n    <ul class=\"otherOrganizationList small-block-grid-2 medium-block-grid-4 large-block-grid-5 organization-list\">\n    </ul>\n  </section>\n\n  <section id=\"requestNew\" class=\"row collapse\" style=\"text-align:center;\">\n    <h3><a class=\"button\" href=\"/organizations/new\">Request a New Organization</a></h3>\n  </section>\n\n</div>";
  });

this["templates"]["organization/permissions"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <table>\n    <thead>\n    <tr>\n      <th>Username</th>\n      <th>Write Permission</th>\n      <th>Add</th>\n      <th>Remove</th>\n    </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.pending), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <tr id=\"";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" style=\"line-height:1em;\">\n        <td>";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td style=\"text-align:center;\">\n          <input type=\"checkbox\" class=\"writePerm\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.writePerm), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        </td>\n        <td><button style=\"margin:0;\" data-userId=\"";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"button tiny radius add\">✓</button></td>\n        <td><button style=\"margin:0;\" data-userId=\"";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"button tiny radius alert remove\">X</button></td>\n      </tr>\n    ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "checked";
  }

function program5(depth0,data) {
  
  
  return "\n  <p>None</p>\n  ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <table>\n    <thead>\n    <tr>\n      <th>Username</th>\n      <th>Write Permission</th>\n      <th>Remove</th>\n    </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.users), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  <table>\n  ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isPending), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <tr id=\"";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n        <td>";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td style=\"text-align:center;\">\n          <input type=\"checkbox\" class=\"writePerm\" data-userId=\"";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.writePerm), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        </td>\n        <td><button style=\"margin:0;\" data-userId=\"";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"button tiny alert remove\">X</button></td>\n      </tr>\n      ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n  <p>No Administrative users</p>\n  ";
  }

  buffer += "<hr></hr>\n\n<article id=\"addNewUser\" class=\"row collapse\">\n<h4>Add User</h4>\n  <div class=\"small-10 columns\">\n    <input class=\"addNewUser username\" type=\"text\" placeholder=\"Username, gtid, or buzzcard\">\n  </div>\n  <div class=\"small-2 columns\">\n    <a href=\"#\" class=\"button postfix addNewUser submit\">Add</a>\n  </div>\n</article>\n\n<hr></hr>\n\n<article id=\"pendingRequestsPermissions\" class=\"row collapse\">\n  <h4>Pending Requests</h4>\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.pending)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>\n\n<hr></hr>\n\n<article id=\"registeredUserPermissions\" class=\"row collapse\">\n  <h4>Registered Users</h4>\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.users)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(11, program11, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  });

return this["templates"];

});