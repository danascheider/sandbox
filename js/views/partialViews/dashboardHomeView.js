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

  template         : JST['partials/dashHome'],

  /* Canto View Properties
  /**************************************************************************/

  klass            : 'DashboardHomeView',
  family           : 'Canto.View',
  superFamily      : 'Backbone.View',
  types            : function() {
    return Canto.View.prototype.types().concat(['DashboardHomeView', 'PartialView']);
  },

  /* View Events
  /**************************************************************************/

  /* Event Callbacks
  /**************************************************************************/

  /* Special Functions
  /**************************************************************************/

  createTopWidgets : function() {
    var that = this;

    this.topWidgetView = new TopWidgetView({
      taskCollection: that.user.tasks,
      deadlineCount: 2,
      appointmentCount: 4,
      recommendationCount: 11
    });
  },

  renderTaskPanelView : function() {
    this.taskPanelView.render();
  },

  setUser             : function(user) {
    this.user       = user;
    this.collection = this.user.tasks;

    // Create view elements
    this.taskPanelView = new TaskPanelView({collection: this.collection});
    this.createTopWidgets();
  },

  /* Core View Functions
  /**************************************************************************/

  initialize          : function(opts) {
    opts = opts || {};

    if(opts.user) {
      this.setUser(opts.user);
    }
  },

  remove              : function() {
    this.taskPanelView.remove();
    this.topWidgetView.remove();
    Canto.View.prototype.remove.call(this);
  },

  render              : function() {
    var that = this;

    return Canto.View.prototype.render.call(this, this.template(), function() {
      that.taskPanelView.render();
      that.$('div.col-lg-6').first().html(that.taskPanelView.$el);
      that.topWidgetView.render();

      // Remove the top widget view if it is already in the DOM in order to 
      // maintain idempotency when using prepend() for DOM insertion
      
      if($.contains(that.$el, that.topWidgetView.$el)) { that.topWidgetView.remove(); }
      that.$el.prepend(that.topWidgetView.$el);
    });
  }

});

module.exports = DashboardHomeView;