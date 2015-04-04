/* Core Requires
/*****************************************************************************************/

Canto = Canto || require('../dependencies.js');

/* Module-Specific Requires
/*****************************************************************************************/

DashboardView = require('../views/appViews/dashboardView.js');

/* ***************************************************************************************\
 * DASHBOARD PRESENTER                                                                   *
\*****************************************************************************************/

var DashboardPresenter = Backbone.Model.extend({

  /* Event Callbacks
  /***************************************************************************************/

  redirect   : function(opts) {
    this.trigger('redirect', opts);
  },

  /* Core Model Functions
  /***************************************************************************************/

  initialize : function(opts) {
    opts = opts || {};

    this.dashboardView = new DashboardView();
  }
});

module.exports = DashboardPresenter;