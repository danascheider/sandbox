require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/partialViews/dashboardTopWidgetView.js');

var matchers       = _.extend(require('jasmine-jquery-matchers'), require(process.cwd() + '/spec/support/matchers/toBeA.js')),
    Fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    context        = describe,
    fcontext       = fdescribe;

describe('Dashboard Top Widget View #travis', function() {
  var view, data;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, Fixtures);

    data = {
      taskCollection: collection,
      deadlineCount: 6,
      appointmentCount: 2,
      recommendationCount: 12
    };
  });

  beforeEach(function() {
    view = new SUT(data);
  });

  afterAll(function() {
    view.remove();
    view = null;
    global = _.omit(global, Fixtures);
  });

  describe('constructor', function() {
    it('doesn\'t call render', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT(data);
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    _.each(['taskCollection', 'deadlineCount', 'appointmentCount', 'recommendationCount'], function(datum) {
      it('sets the ' + datum, function() {
        expect(view[datum]).toEqual(data[datum]);
      });
    });
  });

  describe('elements', function() {
    beforeEach(function() {
      view.render();
    });

    describe('task widget', function() {
      it('includes the task count', function() {
        expect(view.$('div.dash-widget[data-name=tasks] div.huge')).toHaveText(data.taskCollection.length);
      });
    });

    describe('deadline widget', function() {
      it('includes the deadline count', function() {
        expect(view.$('div.dash-widget[data-name=deadlines]')).toHaveText(data.deadlineCount);
      });
    });

    describe('appointment widget', function() {
      expect(view.$('div.dash-widget[data-name=appointments]')).toHaveText(data.appointmentCount);
    });

    describe('recommendation widget', function() {
      expect(view.$('div-dash-widget[data-name=recommendations]')).toHaveText(data.recommendationCount);
    });
  });
});