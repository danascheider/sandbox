require('../../../dependencies.js');

var TaskModel = require('../../../models/taskModel.js');
var ModelView = require('./taskModelView.js');

var ListItemView = Backbone.View.extend({
  tagName    : 'li',
  className  : 'task-list-item ui-widget-content ui-draggable',
  id         : function() { return 'task-' + this.model.get('id'); },
  template   : JST['tasks/listItem'],

  // --------------- //
  // Event Callbacks //
  // --------------- //

  backlogTask: function() {
    this.model.save({backlog: true});
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  isA        : function(type) {
    var trueValues = ['TaskListItemView', 'ListItemView', 'Backbone.View'];
    return trueValues.indexOf(type) > -1 ? true : false;
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize : function() {
    this.modelView = new ModelView({model: this.model});
  },

  render     : function() {
    this.$el.html(this.template());

    this.modelView.render();
    this.$('td.task-listing').html(this.modelView.el);
  }
});

module.exports = ListItemView;