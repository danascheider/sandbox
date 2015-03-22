require('../../dependencies.js');

var DashboardSidebarView = Backbone.View.extend({
  template        : JST['partials/sidebar'],

  // --------------- //
  // Event Callbacks //
  // --------------- //

  goToDashboard   : function() {
    this.trigger('redirect:dashboard');
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  // For testing purposes - location.hash can't be stubbed
  // directly, so this has to be called in the methods that 
  // require the information.

  getLocationHash : function() {
    return location.hash;
  },

  isA             : function(type) {
    var types = [
      'Backbone.View',
      'DashboardSidebarView',
      'DashboardView',
      'PartialView'
    ];

    return types.indexOf(type) > -1;
  }
});

module.exports = DashboardSidebarView;