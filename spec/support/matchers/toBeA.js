module.exports = {
  toBeA: function(util, customEqualityTesters) {
    return {
      compare : function(actual, expected) {
        var result = {
          pass : util.equals(actual.isA, expected, customEqualityTesters)
        };

        if(!result.pass) {
          result.message = 'Expected ' + actual + ' to be a ' + expected;
        }

        return result;
      }
    };
  }
};