require('./dependencies.js');
require('./utils.js');

// Require models
require('./models/cantoModel.js');
require('./models/protectedResourceModel.js');
require('./models/taskModel.js');
require('./models/userModel.js');

// Require collections
require('./collections/protectedCollection.js');
require('./collections/taskCollection.js');

// Require top-level views
require('./views/appViews/cantoView.js');
require('./views/appViews/dashboardView.js');

// Require model and collection views
require('./views/modelViews/taskViews/taskListItemView.js');
require('./views/modelViews/taskViews/taskModelView.js');
require('./views/modelViews/taskViews/quickAddFormView.js');
require('./views/collectionViews/taskCollectionView.js');

// Require partial views
require('./views/partialViews/dashboardSidebarView.js');

// Require presenters
require('./presenters/appPresenter.js');

// Require router
var router = require('../spec/support/testRouter.js');
global.Router = new router();
Backbone.history.start();