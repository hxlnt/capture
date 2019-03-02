const assert = require('assert')
const capture = require('../app.js')

describe('capture', function() {
    describe('#capture.readFile()', function() {
      it('should read questions.yaml', function() {
        let result = capture.readFile("questions.yaml");
        result[0].should.equal("#")
      });
    });
  });