Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var fixtures = require('../../../spec/support/fixtures/fixtures.js');
var DashboardHomeView = require('../partialViews/dashboardHomeView.js');

var SpecWrapper = Canto.View.extend({
  template: JST['spec/dashHome'],
  el      : 'body',

  events  : {
    'click a[data-method=showLoginForm]'   : 'showLoginForm',
    'click a[data-method=hideLoginForm]'   : 'callHideLoginForm',
    'click a[data-method=toggleLoginForm]' : 'callToggleLoginForm'
  },

  /* Event Callbacks
  /***************************************************************************/

  callHideLoginForm   : function(e) {
    e.preventDefault();
    this.view.hideLoginForm($.Event('dblclick', {target: view.$('#shade')}));
  },

  callToggleLoginForm : function(e) {
    e.preventDefault();
    this.view.toggleLoginForm($.Event('click', {target: view.$('.login-link')}));
  },

  showLoginForm       : function(e) {
    e.preventDefault();
    if(!this.view.$('#login-form').is(':visible')) {
      this.view.toggleLoginForm($.Event('click', {target: view.$('.login-link')}));
    }
  },

  /* Core View Functions
  /***************************************************************************/

  initialize : function() {
    this.view = new DashboardHomeView({user: fixtures.user});
    this.render();
  },

  render  : function() {
    var that = this;

    return Canto.View.prototype.render.call(this, this.template(), function() {
      that.$el.addClass('test');
      that.view.render();
      that.$('#view').html(that.view.$el);
    });
  }
});

module.exports = SpecWrapper;