var testEnv = {
  Chai      : require('chai'),
  Sinon     : require('sinon'),
  SinonChai : require('sinon-chai'),

  btoa      : function(string) {
    return new Buffer(string).toString('base64');
  }
};

testEnv.Chai.use(testEnv.SinonChai);

module.exports = testEnv;