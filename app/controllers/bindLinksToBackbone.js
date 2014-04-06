/*
  This function finds all links starting with /
  and captures a 'click' action.  It then triggers
  the route associated with said link path

  E.g usage: new BindLinksToBackbone(app)
*/
define(['jquery', 'backbone'],
function($,        Backbone) {
  var bindLinksToBackbone = function(app) {
    $(document).on("click", "a[href^='/']", function(event) {
      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        var url = $(event.currentTarget).attr("href").replace(/^\//, "");
        
        if(url.indexOf('api') === 0) { return; }
        event.preventDefault();
        
        
        // Route to only new url paths
        if(Backbone.history.fragment !== url) {
          // Remove old view
          if(app.views.current && app.views.current.remove) {
              app.views.current.remove();
          }
          // Remove reference to old controller
          if(app.controller) {
            app.controller = null;
          }
          app.router.navigate(url, { trigger: true });
          /*
              Sometimes when rendering a new page, 
              the document is not scrolled to the top.
              this ensures that all navigation brings the user
              to the top of the page
          */
          $("html,body").scrollTop(0);
        }
      }
    });
  };
  return bindLinksToBackbone;
});