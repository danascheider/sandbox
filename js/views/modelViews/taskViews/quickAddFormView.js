require('../../../dependencies.js');

var QuickAddFormView = Backbone.View.extend({
  tagName    : 'form',
  className  : 'task-form create-form quick-add-form',

  initialize : function(opts) {
    opts = opts || {};
    this.grouping = opts.grouping;
  }
});

module.exports = QuickAddFormView;