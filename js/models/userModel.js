var App = require(process.cwd() + '/js/dependencies.js');

var Backbone = App.Backbone, _ = App._, $ = App.$;

var UserModel = Backbone.Model.extend({
  urlRoot: App.API.users.collection
});

module.exports = UserModel;