var App                 = require(process.cwd() + '/js/dependencies.js');
var Task                = require(process.cwd() + '/js/models/taskModel.js');
var ProtectedCollection = require(process.cwd() + '/js/collections/protectedCollection.js');

var TaskCollection = ProtectedCollection.extend({
  comparator : 'position',
});

module.exports = TaskCollection;