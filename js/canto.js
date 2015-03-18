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

// Require presenters
require('./presenters/appPresenter.js');