require('../../dependencies.js');

var TaskCollectionView = Backbone.View.extend({
  initialize : function() {
    this.childViews = [];
  }
});

module.exports = TaskCollectionView;