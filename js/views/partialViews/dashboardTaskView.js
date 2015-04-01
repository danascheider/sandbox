Canto      = Canto      || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var DashboardTaskView = Canto.View.extend({

  /* Backbone View Properties
  /**************************************************************************/

  /* Canto View Properties
  /**************************************************************************/

  klass       : 'DashboardTaskView',
  family      : 'Canto.View',
  superFamily : 'Backbone.View',

  /* Special Functions
  /**************************************************************************/

  setUser : function(user) {
    //
  },

  /* Core View Functions
  /**************************************************************************/

  initialize : function(opts) {
    opts = opts || {};

    this.setUser(opts.user);
  }
});

module.exports = DashboardTaskView