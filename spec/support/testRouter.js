require('../../js/dependencies.js');
var ListItemView = require('../../js/views/specViews/taskListItemSpecView.js');

var TestRouter = Backbone.Router.extend({
  routes : {
    'listItemViewSpec(/)' : 'displayListItemView'
  },

  displayListItemView : function() {
    view = new ListItemView();
    view.render();
  }
});

module.exports = TestRouter;