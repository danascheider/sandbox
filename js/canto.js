require('./dependencies.js');

// Require models
require('./models/protectedResourceModel.js');
require('./models/taskModel.js');
require('./models/userModel.js');

// Require collections
require('./collections/protectedCollection.js');
require('./collections/taskCollection.js');

// Require views
require('./views/modelViews/taskViews/taskListItemView.js');
require('./views/modelViews/taskViews/taskModelView.js');
require('./views/modelViews/taskViews/quickAddFormView.js');

// Require partial views
require('./views/partialViews/dashboardSidebarView.js');

// Require top-level views
require('./views/appViews/dashboardView.js');

// Require presenters
require('./presenters/appPresenter.js');

// Require router
var router = require('../spec/support/testRouter.js');
global.Router = new router();
Backbone.history.start();