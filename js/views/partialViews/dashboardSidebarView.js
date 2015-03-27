Canto = Canto || require('../../dependencies.js');

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
      this.$('.nav-second-level:visible').slideUp();
      li.addClass('active').find('.nav-second-level').slideDown();
    } else {
      li.removeClass('active').find('.nav-second-level').slideUp();
    }

    if(li.className === '') { li.removeAttr('class'); }
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