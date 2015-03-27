require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/spec/support/env.js');

Canto.View         = require(process.cwd() + '/js/views/appViews/cantoView.js');

var custom         = require(process.cwd() + '/spec/support/matchers/toBeA.js');
    context        = describe,
    fcontext       = fdescribe;

Backbone.$         = $;

describe('Canto.View', function() {
  var view;

  beforeEach(function() {
    view = new Canto.View();
  });

  afterAll(function() {
    view = null;
  });

  describe('types', function() {
    it('includes Backbone.View', function() {
      expect(view.types()).toContain('Backbone.View');
    });

    it('includes Canto.View', function() {
      expect(view.types()).toContain('Canto.View');
    });
  });
});