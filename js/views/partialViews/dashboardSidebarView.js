require('../../dependencies.js');

var DashboardSidebarView = Backbone.View.extend({
  tagName              : 'ul',
  className            : 'nav',
  id                   : 'side-menu',
  template             : JST['partials/sidebar'],

  events               : {
    'click a.sidebar-link'       : 'toggleSecondLevelNav',
    'click li > .dashboard-link' : 'goToDashboard',
    'click li > .task-page-link' : 'goToTaskPage'
  },

  // --------------- //
  // Event Callbacks //
  // --------------- //

  goToDashboard        : function() {
    this.trigger('redirect', {destination: 'dashboard'});
  },

  goToTaskPage         : function() {
    this.trigger('redirect', {destination: 'tasks'});
  },

  toggleSecondLevelNav : function(e) {
    var li = $(e.target).closest('li');

    if(!li.hasClass('active')) {
      li.siblings('li').removeClass('active');
      li.siblings('li').find('ul.nav-second-level:visible').slideUp();
    }

    li.toggleClass('active');
    li.find('ul.nav-second-level').slideToggle();
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  // For testing purposes - location.hash can't be stubbed
  // directly, so this has to be called in the methods that 
  // require the information.

  getLocationHash      : function() {
    return location.hash;
  },

  isA                  : function(type) {
    var types = [
      'Backbone.View',
      'DashboardSidebarView',
      'DashboardView',
      'PartialView'
    ];

    return types.indexOf(type) > -1;
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  render               : function() {
    this.$el.html(this.template());
    this.delegateEvents();
    return this;
  }
});

module.exports = DashboardSidebarView;