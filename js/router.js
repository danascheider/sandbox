Canto = Canto || require('./dependencies.js');
require('./models/taskModel.js');
require('./views/modelViews/taskViews/taskListItemView.js');
require('./views/modelViews/taskViews/taskModelView.js');

require('../vendor/backbone-route-filter.js');

var Router = Backbone.Router.extend({
  initialize : function() {
    // this.AppPresenter       = new AppPresenter();
    // this.DashboardPresenter = new DashboardPresenter();
    //
    // this.listenTo(this.appPresenter, 'redirect', this.navigateTo);
    // this.listenTo(this.dashboardPresenter, 'redirect', this.navigateTo);
  },

  // --------------------------- //
  // Event Callbacks (Non-Route) //
  // --------------------------- //

  navigateTo         : function(obj) {
    this.navigate(obj.destination, {trigger: true});
  },

  // -------------------------- //
  // Routes and Route Callbacks //
  // -------------------------- //

  routes: {
    '(/)'            : 'displayHomepage',
    'home(/)'        : 'displayHomepage',
    'dashboard(/)'   : 'displayDashboardHome',
    'tasks(/)'       : 'displayTaskView',
    'logout(/)'      : 'logOut',
    '*actions'       : 'defaultAction'
  },

  before: {
    'dashboard(/)' : 'verifyLoggedIn',
    'tasks(/)'     : 'verifyLoggedIn',
    '(/)'          : 'rerouteIfLoggedIn'
  },

  defaultAction: function(action) {
    // FIX: In production this should render some sort of a 'missing
    //      resource' view since opera singers have an inexplicable
    //      tendency not to check their JavaScript consoles when a
    //      page doesn't load.
    console.log('No route for ', action);
  },

  displayDashboardHome: function() {
    // if(!this.dashboardPresenter.user) { this.dashboardPresenter.setUser(new UserModel({id: $.cookie('userID')})); }
    // this.dashboardPresenter.getHome();
  },

  displayTaskView: function() {
    // if(!this.dashboardPresenter.user) { this.dashboardPresenter.setUser(new UserModel({id: $.cookie('userID')})); }
    // this.dashboardPresenter.getTask();
  },

  displayHomepage: function() {
    // this.dashboardPresenter.removeAll();
    // this.appPresenter.getHomepage('body');
  },

  logOut: function() {
    // $.removeCookie('auth');
    // $.removeCookie('userID');
    // this.navigate('', {trigger: true});
  },

  rerouteIfLoggedIn: function(fragment, args, next) {
    // if (!$.cookie('auth')) {
    //   next();
    // } else {
    //   this.appPresenter.removeAll();
    //   this.navigate('dashboard', {trigger: true});
    // }
  },

  verifyLoggedIn: function(fragment, args, next) {
    // if ($.cookie('auth')) {
    //   next();
    // } else {
    //   this.navigate('', {trigger: true});
    // }
  }
});

module.exports = Router;