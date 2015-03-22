require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/appViews/dashboardView.js');

var matchers       = require('jasmine-jquery-matchers'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    UserModel      = require(process.cwd() + '/js/models/userModel.js'),
    TaskModel      = require(process.cwd() + '/js/models/taskModel.js'),
    TaskCollection = require(process.cwd() + '/js/collections/taskCollection.js'),
    context        = describe; // RSpecify

Backbone.$         = $;

var user  = new UserModel({id: 342, username: 'testuser', password: 'testuser', email: 'testuser@example.com', first_name: 'Test', last_name: 'User'});

var task1 = new TaskModel({id: 1, owner_id: 342, title: 'Test Task 1', status: 'New'}),
    task2 = new TaskModel({id: 2, owner_id: 342, title: 'Test Task 2', status: 'New'}),
    task3 = new TaskModel({id: 3, owner_id: 342, title: 'Test Task 3', status: 'Complete'});

user.tasks = new TaskCollection([task1, task2, task3]);

describe('Main Dashboard View', function() {
  var dashboard, e, spy;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
    dashboard = new SUT({user: user});
  });

  afterAll(function() {
    dashboard.remove();
    dashboard = null;
  });

  describe('constructor', function() {
    it('calls setUser #travis', function() {
      pending('Need to implement the setUser method');
      spyOn(SUT.prototype, 'setUser');
      var newView = new SUT({user: user});
      expect(SUT.prototype.setUser).toHaveBeenCalled();
      expect(SUT.prototype.setUser.calls.argsFor(0)[0]).toEqual(user);
    });

    it('instantiates a sidebar #travis', function() {
      pending('Need to implement the sidebar view');
    });

    it('instantiates a home view #travis', function() {
      pending('Need to implement the dashboard home view');
    });

    it('instantiates a task view #travis', function() {
      pending('Need to implement the dashboard task view');
    });

    it('doesn\'t call render #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({user: user});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('can be instantiated without a user #travis', function() {
      var newView = new SUT();
      expect(newView.user).not.toExist();
    });
  });

  describe('elements', function() {
    beforeEach(function() {
      dashboard.render();
    });

    it('is a div #travis', function() {
      expect(dashboard.$el[0].tagName).toEqual('DIV');
    });

    it('has ID #dashboard-wrapper #travis', function() {
      expect(dashboard.$el).toHaveId('dashboard-wrapper');
    });

    describe('sidebar', function() {
      it('is attached to div.sidebar-collapse element', function() {
        pending('Need to implement the dashboard sidebar view');
      });
    });
  });

  describe('event callbacks', function() {
    beforeEach(function() { dashboard.render(); });
    afterEach(function() { dashboard.remove(); });

    describe('hideDropdownMenus', function() {
      context('when none of the menus is open', function() {
        it('doesn\'t open the menus #travis', function() {
          dashboard.$('li.dropdown').removeClass('open');
          e = $.Event('click', {target: dashboard.$el});
          dashboard.hideDropdownMenus(e);
          expect(dashboard.$('li.dropdown.open').length).toEqual(0);
        });
      });

      context('when a menu is open', function() {
        it('removes the .open class #travis', function() {
          dashboard.$('li.dropdown').first().addClass('open');
          e = $.Event('click', {target: dashboard.$el});
          dashboard.hideDropdownMenus(e);
          expect(dashboard.$('li.dropdown').first()).not.toHaveClass('open');
        });
      });

      context('when the clicked-on object is inside the menu', function() {
        it('doesn\'t hide the menu #travis', function() {
          dashboard.$('li.dropdown').first().addClass('open');
          e = $.Event('click', {target: dashboard.$('li.dropdown').first().find('ul.dropdown-menu')});
          dashboard.hideDropdownMenus(e);
          expect(dashboard.$('li.dropdown').first()).toHaveClass('open');
        });
      });
    });

    describe('toggleDropdownMenu', function() {
      context('when none of the menus is open', function() {
        beforeEach(function() {
          e = $.Event('click', {target: dashboard.$('a.dropdown-toggle').first()});
          dashboard.toggleDropdownMenu(e);
        });

        it('adds the .open class to the target menu #travis', function() {
          expect(dashboard.$('li.dropdown').first()).toHaveClass('open');
        });

        it('doesn\'t add the .open class to the other menus #travis', function() {
          expect(dashboard.$('li.dropdown').last()).not.toHaveClass('open');
        });
      });

      context('when another menu is open', function() {
        beforeEach(function() {
          dashboard.$('li.dropdown').last().addClass('open');
          e.target = dashboard.$('a.dropdown-toggle').first();
          dashboard.toggleDropdownMenu(e);
        });

        it('removes the .open class from the open menu #travis', function() {
          expect(dashboard.$('li.dropdown').last()).not.toHaveClass('open');
        });

        it('adds the .open class to the target menu #travis', function() {
          expect(dashboard.$('li.dropdown').first()).toHaveClass('open');
        });
      });
    });

    describe('showHomeView', function() {
      context('when the main dash and home view are visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.homeView.$el, 'is').and.callFake(function() { return true; });
        });

        it('doesn\'t re-render the main dash #travis', function() {
          spyOn(dashboard, 'render');
          dashboard.showHomeView();
          expect(dashboard.render).not.toHaveBeenCalled();
        });

        it('renders the home view #travis', function() {
          pending('Need to implement the dashboard home view');
        });

        it('attaches the home view to the DOM #travis', function() {
          pending('Need to implement the dashboard home view');
        });
      });

      context('when the main dash and task view are visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.taskView.$el, 'is').and.callFake(function() { return true; });
        });

        it('doesn\'t re-render the main dash #travis', function() {
          spyOn(dashboard, 'render');
          dashboard.showHomeView();
          expect(dashboard.render).not.toHaveBeenCalled();
        });

        it('removes the task view #travis', function() {
          pending('Need to implement the dashboard task view');
        });

        it('renders the home view #travis', function() {
          pending('Need to implement the dashboard home view');
        });

        it('attaches the home view to the DOM #travis', function() {
          pending('Need to implement the dashboard home view');
        });
      });

      context('when the main dash isn\'t visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return false; });
        });

        it('renders the main dash #travis', function() {
          spyOn(dashboard, 'render');
          dashboard.showHomeView();
          expect(dashboard.render).toHaveBeenCalled();
        });

        it('renders the home view #travis', function() {
          pending('Need to implement the dashboard home view');
        });

        it('attaches the home view to the DOM #travis', function() {
          pending('Need to implement the dashboard home view');
        });
      });
    });

    describe('showTaskView', function() {
      context('when the main dash and home view are visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.homeView.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.taskView.$el, 'is').and.callFake(function() { return false; });
        });

        it('doesn\'t re-render the main dash #travis', function() {
          spyOn(dashboard, 'render');
          dashboard.showTaskView();
          expect(dashboard.render).not.toHaveBeenCalled();
        });
      });

      context('when the main dash and task view are visible');
      context('when the main dash isn\'t visible');
    });
  });

  describe('special functions', function() {
    describe('setUser', function() {
      it('sets this.user #travis', function() {
        var newView = new SUT(); // we already know this won't set the user
        newView.setUser(user);
        expect(newView.user).toBe(user);
      });

      it('calls setUser on the home view #travis', function() {
        pending('Need to implement the dashboard home view');
      });

      it('calls setUser on the task view #travis', function() {
        pending('Need to implement the dashboard task view');
      });
    });
  });

  describe('core functions', function() {
    describe('render', function() {
      it('sets the HTML of its el #travis', function() {
        spyOn(dashboard.$el, 'html');
        dashboard.render();
        expect(dashboard.$el.html).toHaveBeenCalled();
      });

      it('calls delegateEvents on itself #travis', function() {
        spyOn(dashboard, 'delegateEvents');
        dashboard.render();
        expect(dashboard.delegateEvents).toHaveBeenCalled();
      });

      it('returns itself #travis', function() {
        expect(dashboard.render()).toEqual(dashboard);
      });
    });

    describe('remove', function() {
      it('removes the home view #travis', function() {
        pending('Need to implement the dashboard home view');
      });

      it('removes the task view #travis', function() {
        pending('Need to implement the dashboard task view');
      });

      it('removes itself through the Backbone.View prototype #travis', function() {
        spyOn(Backbone.View.prototype.remove, 'call');
        dashboard.remove();
        expect(Backbone.View.prototype.remove.call.calls.argsFor(0)[0]).toBe(dashboard);
      });
    });
  });
});