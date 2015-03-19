var taskModel = require('../../js/models/taskModel.js');
var taskListItemView = require('../../js/views/modelViews/taskViews/taskListItemView.js');

var TestRouter = Backbone.Router.extend({
  routes : {
    'listItemViewSpec(/)' : 'displayListItemView'
  },

  displayListItemView : function() {
    var opts = {id: 1, title: 'Troubleshoot Selenium tests'},
        task = new taskModel(opts),
        view = new taskListItemView({model: task});
    view.render();
    $('body').html(view.$el);
  }
});

module.exports = TestRouter;