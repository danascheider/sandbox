// Require main dependencies
require('./dependencies.js');

// Require models
require('./models/protectedResourceModel.js');
require('./models/taskModel.js');
require('./models/userModel.js');

// Require collections
require('./collections/protectedCollection.js');
require('./collections/taskCollection.js');

// Require model views
require('./views/modelViews/taskViews/taskModelView.js');
require('./views/modelViews/taskViews/taskListItemView.js');

// Require API and API options
require('./apiOptions.js');
require('./api.js');