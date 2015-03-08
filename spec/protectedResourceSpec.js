require(process.cwd() + '/js/dependencies.js');

var Env = require(process.cwd() + '/spec/env.js');
var expect = Env.Chai.expect;

var SUT = require(process.cwd() + '/js/models/protectedResource.js');

describe('Protected Resource', function() {
  var resource;

  it('exists', function() {
    resource = new SUT();
    expect(resource).to.exist;
  });
});