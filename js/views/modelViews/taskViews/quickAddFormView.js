require('../../../dependencies.js');

var QuickAddFormView = Backbone.View.extend({
  initialize: function(opts) {
    opts = opts || {};
    this.grouping = opts.grouping;
  }
});

module.exports = QuickAddFormView;