Canto      = Canto      || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var DashboardTaskView = Backbone.View.extend({
  setUser : function(user) {
    //
  },

  initialize : function(opts) {
    opts = opts || {};
    
    this.setUser(opts.user);
  }
});

module.exports = DashboardTaskView