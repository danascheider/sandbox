Canto = Canto || require('../../js/dependencies.js');

var ListItemView         = require('../../js/views/specViews/taskListItemSpecView.js'),
    DashboardView        = require('../../js/views/specViews/dashboardSpecView.js'),
    DashboardSidebarView = require('../../js/views/specViews/dashboardSidebarSpecView.js'),
    TaskCollectionView   = require('../../js/views/specViews/taskCollectionSpecView.js'),
    TaskPanelView        = require('../../js/views/specViews/taskPanelSpecView.js'),
    TopWidgetView        = require('../../js/views/specViews/dashboardTopWidgetSpecView.js');

var TestRouter = Backbone.Router.extend({
  routes : {
    'listItemViewSpec(/)'           : 'displayListItemView',
    'dashboardSidebarViewSpec(/)'   : 'displayDashboardSidebarView',
    'dashboardTopWidgetViewSpec(/)' : 'displayDashboardTopWidgetView',
    'dashboardViewSpec(/)'          : 'displayDashboardView',
    'taskCollectionViewSpec(/)'     : 'displayTaskCollectionView',
    'taskPanelViewSpec(/)'          : 'displayTaskPanelView',
  },

  displayListItemView         : function() {
    view = new ListItemView();
    view.render();
  },

  displayDashboardSidebarView : function() {
    view = new DashboardSidebarView();
    view.render();
  },

  displayDashboardTopWidgetView: function() {
    view = new TopWidgetView();
  },

  displayDashboardView        : function() {
    view = new DashboardView();
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