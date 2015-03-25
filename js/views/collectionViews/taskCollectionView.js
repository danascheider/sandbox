require('../../dependencies.js');

var QuickAddForm = require('../modelViews/taskViews/quickAddFormView.js');

var TaskCollectionView = Backbone.View.extend({
  tagName    : 'ul',
  initialize : function() {
    this.childViews = [];
    this.quickAddForm = new QuickAddForm({collection: this.collection, grouping: this.grouping});
  }
});

module.exports = TaskCollectionView;