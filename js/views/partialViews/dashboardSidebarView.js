require('../../dependencies.js');

var DashboardSidebarView = Backbone.View.extend({
  // ----------------- //
  // Special Functions //
  // ----------------- //

  isA : function(type) {
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