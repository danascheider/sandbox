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

  backlogTask        : function() {
    this.model.save({backlog: true});
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //
  
  configureDraggable : function() {
    this.$el.draggable({
      containment       : 'parent',
      connectToSortable : '.task-list',

      // FIX: This is untested. We need tests for the stop function
      //      but I haven't implemented them yet because of issues
      //      involving unit-testing functionality that encompasses
      //      multiple elements.

      stop: function() {
        var column = $(this).closest('.kanban-col').find('.panel-heading')[0];

        // At this point, sorting only works on the dashboard. On
        // the Kanban board, tasks change status when dragged and 
        // dropped, but do not change their list position. I may or
        // may not want to change this in the future.
        
        if (!column) {

          // Find out the order of the list. The `items` array is the 
          // array of `li`s in the parent list, and `coll` is the 
          // collection. Within the `each` loop these lists are compared
          // to make sure the `position` of the item in the collection at
          // a given index is the same as the item's actual position in
          // the list. If the actual position differs from the `position`
          // attribute of the model, the actual position is changed.

          // The back-end also implements an equivalent sorting algorithm.
          // Consequently, it is not necessary to sync with the server at
          // this point, and doing so might even cause problems.

          var items = that.$el.closest('ul').children('li.task-list-item'), coll = that.model.collection;

          // Iterator
          var i = 1;

          // FIX: This should trigger an event rather than changing the 
          //      positions of the models itself

          _.each(items, function(item) {
            var model = coll.get($(item).attr('id').match(/(\d+)/)[0]);
            if (model.get('position') !== i) {
              model.set({position: i});
            }
          });
        } else if (column.innerText === 'Backlog') {
          that.model.set('backlog', true);
        } else {
          that.model.set('status', column.innerText);
        }

        that.model.collection.updateAll({
          success: function() {
            that.changePosition();
          }
        });
      }
    });
  },

  isA                : function(type) {
    var trueValues = ['TaskListItemView', 'ListItemView', 'Backbone.View'];
    return trueValues.indexOf(type) > -1 ? true : false;
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize         : function() {
    this.modelView = new ModelView({model: this.model});
  },

  render             : function() {
    this.$el.html(this.template());

    this.modelView.render();
    this.$('td.task-listing').html(this.modelView.el);
  }
});

module.exports = ListItemView;