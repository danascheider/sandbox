/* Core Requires
/*****************************************************************************************/

Canto       = Canto || require('../dependencies.js');
Canto.Model = Canto.Model || require('../models/cantoModel.js');

/* Module-Specific Requires
/*****************************************************************************************/

var DashboardView  = require('../views/appViews/dashboardView.js'),
    TaskCollection = require('../collections/taskCollection.js');

/* ***************************************************************************************\
 * DASHBOARD PRESENTER                                                                   *
\*****************************************************************************************/

var DashboardPresenter = Canto.Model.extend({

  /* Canto Model Properties
  /***************************************************************************************/

  klass      : 'DashboardPresenter',
  types      : function() {
    return Canto.Model.prototype.types().concat(['Presenter', 'DashboardPresenter']);
  },

  /* Event Callbacks
  /***************************************************************************************/

  redirect   : function(opts) {
    this.trigger('redirect', opts);
  },

  /* Special Functions
  /***************************************************************************************/

  setUser    : function(user) {
    this.user = user;
    this.user.tasks = new TaskCollection();
    this.user.protectedFetch();
    this.user.tasks.fetch();
    this.dashboardView.setUser(user);

  },

  /* Core Model Functions
  /***************************************************************************************/

  initialize : function(opts) {
    opts = opts || {};

    this.dashboardView = new DashboardView();
  }
});

module.exports = DashboardPresenter;