Canto = Canto || require('../../js/dependencies.js');

var ListItemView         = require('../../js/views/specViews/taskListItemSpecView.js'),
    DashboardView        = require('../../js/views/specViews/dashboardSpecView.js'),
    DashboardSidebarView = require('../../js/views/specViews/dashboardSidebarSpecView.js'),
    TaskCollectionView   = require('../../js/views/specViews/taskCollectionSpecView.js'),
    TaskPanelView        = require('../../js/views/specViews/taskPanelSpecView.js');

var TestRouter = Backbone.Router.extend({
  routes : {
    'listItemViewSpec(/)'         : 'displayListItemView',
    'dashboardViewSpec(/)'        : 'displayDashboardView',
    'dashboardSidebarViewSpec(/)' : 'displayDashboardSidebarView',
    'taskCollectionViewSpec(/)'   : 'displayTaskCollectionView',
    'taskPanelViewSpec(/)'        : 'displayTaskPanelView',
  },

  displayListItemView         : function() {
    view = new ListItemView();
    view.render();
  },

  displayDashboardView        : function() {
    view = new DashboardView();
    view.render();
  },

  displayDashboardSidebarView : function() {
    view = new DashboardSidebarView();
    view.render();
  },

  displayTaskCollectionView   : function() {
    view = new TaskCollectionView();
    view.render();
  },

  displayTaskPanelView        : function() {
    view = new TaskPanelView();
    view.render();
  }
});

module.exports = TestRouter;