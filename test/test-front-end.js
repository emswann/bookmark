const Nightmare = require('nightmare');
const expect = require("chai").expect;
const env = require('dotenv').config();
const port = process.env.PORT || 8080;

describe('Load a Page', function() {
  this.timeout(30000);

  describe('/ (Home Page)', () => {
    it('should load without error', function(done) {
      var path = 'http://localhost:' + port + '/';

      Nightmare({ show: true })
      .goto(path)
      .evaluate(function() {
        return document.title;
      })
      .then(function(title) {
        expect(title).to.equal('Node Authentication');
        done();
      })
      .catch(function(err) {
        console.log(err);
        done();
      });
    });
  });
});
