require('../../dependencies.js');

var Sidebar = require('../partialViews/dashboardSidebarView.js');

var SpecWrapper = Backbone.View.extend({
  el        : 'body',
  template  : JST['spec/sidebar'],

  events    : {
    'click a[data-method=toggleSecondLevelNav]' : 'callToggleSecondLevelNav',
    'click a[data-method=expandLastNav]'        : 'expandLastNav'
  },

  // --------------- //
  // Event Callbacks //
  // --------------- //

  callToggleSecondLevelNav : function(e) {
    e.preventDefault();
    var that = this;

    var ev = $.Event('click', {target: that.view.$('a[href=#]').first() });
    this.view.toggleSecondLevelNav(ev);
  },

  expandLastNav            : function(e) {
    e.preventDefault();
    var that = this;

    var ev = $.Event('click', {target: that.view.$('a[href=#]').last() });
    if(!this.view.$('a[href=#]').last().is(':visible')) { this.view.toggleSecondLevelNav(ev); }
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize: function() {
    this.view = new Sidebar();
  },

  render    : function() {
    this.$el.html(this.template());
    this.view.render();
    this.$('#view').html(this.view.$el);
    this.view.delegateEvents();
  }
});

module.exports = SpecWrapper;