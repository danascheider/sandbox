require('../../js/dependencies.js');
var ListItemView = require('../../js/views/specViews/taskListItemSpecView.js');
var DashboardView = require('../../js/views/specViews/dashboardSpecView.js');

var TestRouter = Backbone.Router.extend({
  routes : {
    'listItemViewSpec(/)' : 'displayListItemView',
    'dashboardViewSpec(/)': 'displayDashboardView'
  },

  displayListItemView : function() {
    view = new ListItemView();
    view.render();
  },

  displayDashboardView: function() {
    view = new DashboardView();
    view.render();
  }
});

module.exports = TestRouter;