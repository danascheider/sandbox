/***************************************************************************
 *                                                                         *
 * DASHBOARD HOME VIEW                                                     *
 *                                                                         *
 * The DashboardHomeView is the view the user sees when they first log     *
 * into their dashboard. It contains summary information about all their   *  
 * activities and obligations.                                             *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Core Requires .................................................... 30   *
 * Module-Specific Requires ......................................... 36   *
 * Module ........................................................... 44   *
 *   Backbone View Properties ....................................... 50   *
 *   Canto View Properties .......... ............................... 60   *
 *     klass                                                               *
 *     family                                                              *
 *     superFamily                                                         *
 *     types                                                               *
 *   Core Functions ................................................. 69   *
 *     fetch()                                                             *
 *   Special Functions .............................................. 91   *
 *     setUser() .................................................... 92   *
 *     isA() ....................................................... 140   *
 *                                                                         *
/****************************************************************************/

/* Core Requires
/****************************************************************************/

Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

/* Module-Specific Requires
/****************************************************************************/

var User          = require('../../models/userModel.js'),
    TopWidgetView = require('./dashboardTopWidgetView.js'),
    TaskPanelView = require('./taskPanelView.js');

/****************************************************************************
 * BEGIN MODULE                                                             *
/****************************************************************************/

var DashboardHomeView = Canto.View.extend({

  /* Backbone View Properties
  /**************************************************************************/

  /* Canto View Properties
  /**************************************************************************/

  klass       : 'DashboardHomeView',
  family      : 'Canto.View',
  superFamily : 'Backbone.View',
  types       : function() {
    return Canto.View.prototype.types().concat(['DashboardHomeView', 'PartialView']);
  },

  /* View Events
  /**************************************************************************/

  /* Event Callbacks
  /**************************************************************************/

  /* Special Functions
  /**************************************************************************/

  setUser     : function(user) {
    this.user = user;
  },

  /* Core View Functions
  /**************************************************************************/

  initialize  : function(opts) {
    opts = opts || {};

    this.setUser(opts.user);

    if(this.user) {
      this.taskPanel = new TaskPanelView({collection: user.tasks});
    }
  }

});

module.exports = DashboardHomeView;