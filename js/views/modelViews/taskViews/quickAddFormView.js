require('../../../dependencies.js');

var QuickAddFormView = Backbone.View.extend({
  tagName    : 'form',
  className  : 'task-form create-form quick-add-form',

  // --------------- //
  // Event Callbacks //
  // --------------- //

  createTask : function(e) {
    e.preventDefault();
    
    var TaskModel = require('../../../models/taskModel.js');
    var newTask = new TaskModel();

  },

  // --------------- //
  // Special Methods //
  // --------------- //

  isA        : function(type) {
    var types = [
      'Backbone.View',
      'QuickAddFormView',
      'TaskCollectionView',
      'TaskCreateFormView',
      'TaskFormView'
    ];

    return types.indexOf(type) > -1;
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize : function(opts) {
    opts = opts || {};
    this.grouping = opts.grouping;
  }
});

module.exports = QuickAddFormView;