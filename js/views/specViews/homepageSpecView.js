Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var HomepageView = require('../appViews/homepageView.js');

var SpecWrapper = Canto.View.extend({
  el         : 'body',
  template   : JST['spec/homepage'],

  events     : {
    'click a[data-method=showLoginForm]' : 'callShowLoginForm'
  },

  callShowLoginForm: function(e) {
    e.preventDefault();
    this.view.showLoginForm();
  },

  initialize : function() {
    this.view = new HomepageView();
    this.render();
  },

  render     : function() {
    var that = this;

    return Canto.View.prototype.render.call(this, this.template(), function() {
      that.view.render();
      that.$('#view').html(that.view.$el);
    });
  }
});

module.exports = SpecWrapper;