Canto = Canto || require('../../dependencies.js');

var TaskModel      = require('../../models/taskModel.js'),
    Collection     = require('../../collections/taskCollection.js');
    TaskPanel      = require('../partialViews/taskPanelView.js');

// Instantiate tasks to be displayed in view

var task1      = new TaskModel({id: 1, title: 'Task 1', status: 'New', priority: 'Normal', position: 1}),
    task2      = new TaskModel({id: 2, title: 'Task 2', status: 'New', priority: 'Normal', position: 2}),
    task3      = new TaskModel({id: 3, title: 'Task 3', status: 'Complete', priority: 'Normal', position: 3}),
    collection = new Collection([task1, task2, task3]);

var SpecWrapper = Backbone.View.extend({
  el : 'body',
  template : JST['spec/taskPanel'],

  initialize : function() {
    this.view = new TaskPanel({collection: collection});
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