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

  describe('properties', function() {
    it('has klass Canto.View', function() {
      expect(view.klass).toEqual('Canto.View');
    });

    it('has family Backbone.View', function() {
      expect(view.family).toEqual('Backbone.View');
    });

    it('has blank superFamily', function() {
      expect(view.superFamily).toEqual('');
    });
  });

  describe('types', function() {
    it('includes Backbone.View', function() {
      expect(view.types()).toContain('Backbone.View');
    });

    it('includes Canto.View', function() {
      expect(view.types()).toContain('Canto.View');
    });
  });

  describe('isA', function() {
    it('returns true with argument Backbone.View', function() {
      expect(view.isA('Backbone.View')).toBe(true);
    });

    it('returns true with argument Canto.View', function() {
      expect(view.isA('Canto.View')).toBe(true);
    });

    it('returns false with another argument', function() {
      expect(view.isA('Corvette')).toBe(false);
    });
  });
});