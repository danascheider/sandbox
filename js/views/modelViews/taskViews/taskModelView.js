require(process.cwd() + '/js/dependencies.js');

var TaskModel = require(process.cwd() + '/js/models/taskModel.js');

var TaskModelView = Backbone.View.extend({
  tagName      : 'div',
  className    : 'task-model',
  template     : JST['tasks/model'],

  // --------------- //
  // Event Callbacks //
  // --------------- //

  renderOnSync : function() {
    if(this.model.get('status') === 'Complete') { return; }
    this.render();
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  isA          : function(type) {
    return ['TaskModelView', 'Backbone.View'].indexOf(type) > -1 ? true : false;
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize   : function() {
    this.listenTo(this.model, 'sync', this.renderOnSync);
  },

  render       : function() {
    this.$el.html(this.template({model: this.model}));
    return this;
  }
});

module.exports = TaskModelView;