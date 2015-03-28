Canto = Canto || require('../../dependencies.js');

var Fixtures = require('../../../spec/support/fixtures/fixtures.js');

var TaskModel      = require('../../models/taskModel.js'),
    Collection     = require('../../collections/taskCollection.js');
    TaskPanel      = require('../partialViews/taskPanelView.js');

var SpecWrapper = Backbone.View.extend({
  el         : 'body',
  template   : JST['spec/taskPanel'],

  events     : {
    'click a' : 'callMethod'
  },

  callMethod : function(e) {
    e.preventDefault();

    try {
      this.view[$(e.target).attr('data-method')]();
    } catch(err) {
      this[$(e.target).attr('data-method')]();
    }

    if($(e.target).attr('data-method') === 'render') {
      this.$('#view').html(this.view.$el);
    }
  },

  displayIcon: function() {
    if(!this.$('.toggleWidget').is(':visible')) { this.$('.toggleWidget').show(); }
  },

  displayPanelBody: function() {
    if(!this.$('.panel-body').is(':visible')) { this.$('.panel-body').slideDown(); }
  },

  hideIcon: function() {
    if(this.$('.toggleWidget').is(':visible')) { this.$('.toggleWidget').hide(); }
  },

  hidePanelBody: function() {
    if(this.$('.panel-body').is(':visible')) { this.$('.panel-body').slideUp(); }
  },

  initialize : function() {
    this.view = new TaskPanel({collection: Fixtures.collection});
    this.render();
  },

  render   : function() {
    this.$el.html(this.template());
    this.delegateEvents();
    this.view.render();
    this.$('#view').html(this.view.$el);
    this.view.delegateEvents();

    return this;
  }
});

module.exports = SpecWrapper;