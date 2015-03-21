require('../../../dependencies.js');

var QuickAddFormView = Backbone.View.extend({
  tagName    : 'form',
  className  : 'task-form create-form quick-add-form',

  // --------------- //
  // Event Callbacks //
  // --------------- //

  createTask : function(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    
    // Declare variable `that` for use inside Ajax block
    var that  = this;
    var attrs = Canto.Utils.getAttributes(this.$el);
    var TaskModel = require('../../../models/taskModel.js');

    // Make sure the task being created has the attributes 
    // common to this form's collection
    _.each(this.grouping, function(val, key) {
      attrs[key] = val;
    });

    // Position the new task at the top of the list unless otherwise
    // specified
    attrs['position'] = attrs['position'] || 1;

    // Tasks are invalid without a title, so this code should not run
    // unless a title has been entered in the form's input.
    if(!!attrs.title) {
      var newTask = new TaskModel();
      newTask.save(attrs, {
        success    : function(model) {
          that.$el[0].reset();
          that.collection.unshift(model);
          that.trigger('newTask');
        }
      });
    }
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