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
  initialize : function(opts) {
    opts = opts || {};

    this.dashboardView = new DashboardView();
  }
});

module.exports = DashboardPresenter;