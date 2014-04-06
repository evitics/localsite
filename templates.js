define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

Handlebars.registerPartial("example-partial", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class='post'>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.date); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n";
  return buffer;
  }));

Handlebars.registerPartial("newMeetingModal", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<div id=\"newMeetingModal\" class=\"reveal-modal\" data-reveal>\n  <form data-abide=\"ajax\">\n    <div class=\"row\">\n      <h3>Create A New Meeting</h3>\n      <div class=\"large-12 columns\">\n        <label>* Name of the Meeting\n          <input type=\"text\" placeholder=\"My Super Cool Group Meeting\" required pattern=\"^[a-zA-Z0-9\\s]+$\" class=\"name\">\n        </label>\n        <small class=\"error\">Can only use alpha numeric characters</small>\n      </div>\n    </div>\n    <div class=\"row triggers\">\n      <h4>JavaScript code to execute on Guest Checkin</h4>\n      <p>Example code given below. <a id=\"moreHelpLink\" href=\"/help#triggers\">For more Information and Templates click here</a></p>\n      <textarea style=\"height:9rem;\">\nfunction() {\n  mail({\n    to      : {{checkedIn.email}},\n    from    : {{organization.contact.email}},\n    subject : Glad you had fun at: {{meeting.name}},\n    message : \"\n      Hi {{checkedIn.name}},\n      Hope you had fun at {{organization.name}}'s event.  We sure did!.\n      Cordially,\n      {{organization.contact.name}}\n    \";\n  });\n}\n       </textarea>\n      <div class=\"medium-4 columns\">\n        <div class=\"row collapse\">\n          <label>At End of Meeting</label>\n          <div class=\"small-10 columns\">\n            <select class=\"end\">\n              <option value=\"null\">None</option>\n              <option>Something else here</option>\n            </select>\n          </div>\n          <div class=\"small-2 columns\">\n            <a class=\"button postfix secondary addEvTrigger\" href=\"/triggers/new/end\">+</a>\n          </div>            \n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"large-12 columns\">\n        <button class=\"createAMeeting\" type=\"submit\">Create</button>\n      </div>\n    </div>\n  </form>\n  <a class=\"close-reveal-modal\">&#215;</a>\n</div>";
  return buffer;
  }));

this["templates"]["404"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n  <div class=\"small-12 columns\">\n    <h1>404: Something Went Wrong</h1>\n    <h4>";
  if (stack1 = helpers.errMsg) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.errMsg); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n  <td></td>\n  <td></td>\n  <td><a href=\"/analytics/log/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.meetingId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.meetingId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.year) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.year); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.day) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.day); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.day) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.day); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></td>\n  <td>";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.value); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n</tr>";
  return buffer;
  });

this["templates"]["analytics/total/downloadButtons"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row collapse text-center\">\n  <div class=\"medium-6 columns\">\n    <h4>Download logs for the meeting</h4>\n    <a class=\"button\" href=\"/api/downloadCheckins/csv/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.meetingId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.meetingId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">CSV</a>\n    <a class=\"button\" href=\"/api/downloadCheckins/sql/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.meetingId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.meetingId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">SQL</a>\n  </div>\n  <div class=\"medium-6 columns text-center\">\n    <h4>Donload logs for all meetings</h4>\n    <a class=\"button\" href=\"/api/downloadCheckins/csv/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" downloadxs>CSV</a>\n    <a class=\"button\" href=\"/api/downloadCheckins/sql/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" download>SQL</a>\n  </div>\n</div>\n\n";
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"monthHeader\">\n  <td></td>\n  <td colspan=\"3\">\n    <a href=\"/analytics/log/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.meetingId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.meetingId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.year) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.year); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.month) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.month); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.month) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.month); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n  </td>\n</tr>";
  return buffer;
  });

this["templates"]["analytics/total/yearRow"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"yearHeader\">\n  <td colspan=\"4\"><a href=\"/analytics/log/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.meetingId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.meetingId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.year) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.year); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.year) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.year); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div class=\"row collapse\">\n          <h5>\n            ";
  if (stack1 = helpers.timestamp) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.timestamp); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.name)),stack1 == null || stack1 === false ? stack1 : stack1.full)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.isNew), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </h5>\n        </div>\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " <img src=\"/app/img/new-icon.png\" width=\"25px\" height=\"25px\"> ";
  }

  buffer += "<div class=\"row collapse\">\n  <div class=\"large-4 columns\">\n    <div class=\"row collapse\">\n      <h3>Statistics</h3>\n      <ul>\n        <li>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.statistics)),stack1 == null || stack1 === false ? stack1 : stack1.attendance)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Guests Atending</li>\n      </ul>\n    </div>\n  </div>\n  <div class=\"large-8 columns\">\n    <h3>Checkedin Guests:</h3>\n      ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.checkins), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
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
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li>";
  stack1 = self.invokePartial(partials['example-partial'], 'example-partial', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n    ";
  return buffer;
  }

  buffer += "<h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n<ul>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.posts), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n";
  return buffer;
  });

this["templates"]["forms/orgMeeting/layout"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\"";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.short_name), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </option>\n       ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  if (stack1 = helpers.short_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.short_name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n          ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n          ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"row\">\n    <div class=\"small-12 columns\">\n      <button type=\"submit\" class=\"button submit\" disabled=\"true\">";
  if (stack1 = helpers.submitButtonTXT) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.submitButtonTXT); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</button>\n    </div>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<h3>";
  if (stack1 = helpers.headerTXT) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.headerTXT); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n<form class=\"orgMeeting\">\n  <div class=\"row collapse\">\n    <label>Organization</label>\n    <div class=\"small-10 medium-11 columns\">\n      <select class=\"organization-dropdown\">\n        <option value=\"\">--Please Select One--</option>\n       ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.organizations), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </select>\n    </div>\n    <div class=\"small-1 small-pull-1 medium-1 medium-pull-0 columns\">\n      <a class=\"button postfix secondary joinAnOrganization\" href=\"/organizations\" style=\"min-width:3em;\">+</a>\n    </div>\n  </div>\n\n  <div class=\"row collapse\">\n    <label>Meeting Name</label>\n    <div class=\"small-10 medium-11 columns\">\n      <select disabled=\"disabled\" class=\"meeting-dropdown\">\n        \n      </select>\n    </div>\n    <div class=\"small-1 small-pull-1 medium-1 medium-pull-0 columns\">\n      <a class=\"disabled button postfix secondary revealNewMeetingModal\" style=\"min-width:3em\">+</a>\n    </div>\n  </div>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.submitButtonTXT), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
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
  
  var buffer = "", stack1;
  buffer += "\n    <option value=\"";
  if (stack1 = helpers.meetingId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.meetingId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
  


  return "<h3>FAQ:</h3>\n<ul>\n  <li><a href=\"#triggers\">Trigger Code</a></li>\n  <li><a href=\"#checkIns\">CheckIns</a></li>\n  <li><a href=\"#marketing\">Marketing</a></li>\n  <li><a href=\"#analytics\">Analytics</a></li>\n</ul>\n<article id=\"triggers\">\n  <code>\n  {\n    \"name\" : \"Hi World\"\n  }\n  </code>\n</article>\n\n<article id=\"checkIns\">\n <h4>Checkins</h4>\n</article>\n\n<article id=\"marketing\">\n  <h4>Marketing</h4>\n</article>\n\n<article id=\"analytics\">\n  <h4>Analytics</h4>\n</article>";
  });

this["templates"]["home/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section id=\"main/startMeetingForm\" class=\"large-6 large-push-6 columns fixed-top-right orgMeetingForm\">\n  \n</section>\n<section id=\"news\" class=\"large-6 large-pull-6 columns\">\n  <h3>News</h3>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>IEEE</h4>\n      <p>10 New Members</p>\n      <p>1/20 - 200 members at general Meeting</p>\n      <p>1/19 - 15 members at Hardware Meeting</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"medium-12 columns\">\n      <h4>SGA</h4>\n      <p>100 New Members</p>\n      <p>1/20 - 200 members at IT Team Meeting</p>\n      <p>1/19 - 15 members at Executive Board Get-together</p>\n    </div>\n  </div>\n</section>\n";
  });

this["templates"]["loading"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h3>";
  if (stack1 = helpers.msg) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.msg); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n";
  return buffer;
  });

this["templates"]["meetings/info"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<form id=\"saveMeeting\">\n  <div class=\"row\">\n    <label>Meeting Name:\n      <input type=\"text\" id=\"meetingName\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"font-size:1.5em; height:2em;\">\n    </label>\n  </div>\n\n  <div class=\"row\">\n    <label>JavaScript code to execute on Guest Checkin\n      <a id=\"moreHelpLink\" href=\"/help#triggers\">\n        For more Information and Templates click here\n      </a>\n      <textarea id=\"onCheckIn\" style=\"height:15rem;\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.onCheckIn), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </textarea>\n    </label>\n  </div>\n  <div class=\"row\">\n    <input class=\"button save\" type=\"submit\" value=\"Save\">\n    <button class=\"delete\">Delete</button>\n  </div>\n</form>\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.onCheckIn) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.onCheckIn); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  return escapeExpression(stack1);
  }

function program4(depth0,data) {
  
  
  return "\n          //example email code\n          function() {\n            mail({\n              from: null,\n              to: null,\n              subject : null,\n              message: null\n            });\n          }\n        ";
  }

function program6(depth0,data) {
  
  
  return "\n  <div data-alert class=\"alert-box alert\">\n    You do not have write permissions for this oganization.  Therefore you cannot not modify/delete this meeting.\n  </div>\n";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.writePerm), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["templates"]["meetings/removed"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += " <div data-alert class=\"alert-box success\">\n    Meeting: ";
  if (stack1 = helpers.meetingName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.meetingName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " has been successfully removed from Organization: ";
  if (stack1 = helpers.orgName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ul class=\"off-canvas-list\">\n  <li><label>Evitics</label></li>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
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
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n        <button class=\"alert\">Leave Organization</button>\n      ";
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
  
  
  return "\n          <button>Join Organization</button>\n        ";
  }

  buffer += "<div class=\"small-12 columns\">\n  <div class=\"row \">\n      <h2><img class=\"org-logo\" src=\"";
  if (stack1 = helpers.logo_path) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.logo_path); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></img>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n  </div>\n  <div class=\"row collapse\">\n    <div class=\"small-12\">\n      <p>\n        ";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.description); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n      </p>\n    </div>\n  </div>\n  <div class=\"row collapse\">\n    <div class=\"small-12\">\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.joined), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</div>";
  return buffer;
  });

this["templates"]["organization/list/item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  if (stack1 = helpers.short_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.short_name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n      ";
  return buffer;
  }

  buffer += "<li>\n  <a class=\"th\" href=\"/organizations/";
  if (stack1 = helpers.orgId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.orgId); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <h4>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.short_name), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </h4>\n    <img src=\"";
  if (stack1 = helpers.logo_path) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.logo_path); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></img>\n  </a>\n</li>";
  return buffer;
  });

this["templates"]["organization/list/wrapper"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"small-12 columns organization-list\">\n  <section id=\"myOrganizations\" class=\"row collapse\">\n    <h3>My Organizations:</h3>\n    <ul class=\"myOrganizationList small-block-grid-2 medium-block-grid-5 large-block-grid-6\">\n    \n    </ul>\n  </section>\n\n  <section id=\"otherOrganizations\" class=\"row collapse\">\n    <h3>Other Organizations:</h3>\n    <ul class=\"otherOrganizationList small-block-grid-2 medium-block-grid-4 large-block-grid-5 organization-list\">\n    </ul>\n  </section>\n\n  <section id=\"requestNew\" class=\"row collapse\" style=\"text-align:center;\">\n    <h3><a class=\"button\" href=\"/organizations/new\">Request a New Organization</a></h3>\n  </section>\n\n</div>";
  });

return this["templates"];

});