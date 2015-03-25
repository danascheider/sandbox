function toBeA(util, customEqualityTesters) {
  return {
    compare: function(actual, expected) {
      var result = {};

      result.pass = !!actual.isA(expected);

      if(!result.pass) {
        result.message = 'Expected ' + actual + 'to be a ' + expected;
      }

      return result;
    }
  }
};

module.exports = { toBeA: toBeA };