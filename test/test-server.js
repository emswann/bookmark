const chai     = require('chai');
const chaiHttp = newFunction();
const chaiJson = require('chai-json');
const expect   = require('chai').expect;

 
// Register the plugin
chai.use(chaiHttp);
chai.use(chaiJson);

var server = require('../server');

describe('hooks', function() {
  before(function(done) {
    setTimeout(function() {
      done();
    }, 1800);
  });

  after(function(done) {
    setTimeout(function() {
      done();
    }, 1800);
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  describe('Bookmark', function() {
    // Account login tests.
    // describe('Login', function() {
    //   it('should render home login page on / GET', function(done) {
    //     this.timeout(10000);
    //     chai.request(server)
    //       .get('/')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         done();
    //       });
    //   });

    //   it('should render existing user login page on /login GET', function(done) {
    //     chai.request(server)
    //       .get('/login')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         done();
    //       });
    //   });

    //   describe('Existing User Login Authentication', function() { 
    //     it('should render profile login page for successful login on /login POST', function(done) {
    //       chai.request(server)
    //         .post('/login')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           done();
    //         });
    //     });

    //     it('should render existing user login page with flash message for unsuccessful login on /login POST', function(done) {
    //       chai.request(server)
    //         .post('/login')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           done();
    //         });
    //     });
    //   });   

    //   it('should render new user signup page on /signup GET', function(done) {
    //     chai.request(server)
    //       .get('/signup')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         done();
    //       });
    //   });

    //   describe('New User Signup Authentication', function() { 
    //     it('should render profile login page for successful signup on /signup POST', function(done) {
    //       chai.request(server)
    //         .post('/signup')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           done();
    //         });
    //     });

    //     it('should render new user sign page with flash message for unsuccessful signup on /signup POST', function(done) {
    //       chai.request(server)
    //         .post('/signup')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           done();
    //         });
    //     });
    //   });  

    //   it('should render profile login page on /profile GET', function(done) {
    //     chai.request(server)
    //       .get('/profile')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         done();
    //       });
    //   });

    //   it('should render home login page on /logout GET', function(done) {
    //     chai.request(server)
    //       .get('/logout')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         done();
    //       });
    //   });
    // });

    // Book Search tests.
    describe('Book Search', function() {
      // GET requests.
      it('should render static Book Search page (no books) on /search GET', function(done) {
        chai.request(server)
          .get('/search')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('<div id="search-results">').to.exist;
            done();
          });
      });
    });
  });
});



function newFunction() {
  return require('chai-http');
}
      // it('should render Book Search page with books matching title and not in user library on /api/search/<id>/title/<title> GET', function(done) {
      //   chai.request(server)
      //     .get('/api/search/title/flowers')
      //     .end((err, res) => {
      //       res.should.have.status(200);
      //       res.should.be.json;
      //       done();
      //     });
      // });

      // it('should render Book Search page with books matching author and not in user library on /api/search/<id>/author/<author> GET', function(done) {
      //   chai.request(server)
      //     .get('/api/search/author/flowers')
      //     .end((err, res) => {
      //       res.should.have.status(200);
      //       res.should.be.json;
      //       done();
      //     });
      // });

      // it('should render Book Search page with books matching subject and not in user library on /api/search/<id>/subject/<subject> GET', function(done) {
      //   chai.request(server)
      //     .get('/api/search/subject/flowers')
      //     .end((err, res) => {
      //       res.should.have.status(200);
      //       res.should.be.json;
      //       done();
      //     });
      // });
    // });

  //   // User List tests.
  //   describe('User List', function() {
  //     // GET requests.
  //     it('should render static User List page (no books) on /list GET', function(done) {
  //       chai.request(server)
  //         .get('/list')
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.should.be.html;
  //           done();
  //         });
  //     });

  //     it('should render User List page with dropdown list matching possible categories for user on /api/list/<id>/category GET', function(done) {
  //       chai.request(server)
  //         .get('/api/list/1/category')
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.should.be.json;
  //           done();
  //         });
  //     });

  //     it('should render User List page with dropdown list matching possible statuses for user on /api/list/<id>/status GET', function(done) {
  //       chai.request(server)
  //         .get('/api/list/1/status')
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.should.be.json;
  //           done();
  //         });
  //     });

  //     describe('User List Search', function() {
  //       it('should render User List page with ALL books matching user on /api/list/<id>/<all> GET', function(done) {
  //         chai.request(server)
  //           .get('/api/list/1/all')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             res.should.be.json;
  //             done();
  //           });
  //       });

  //       it('should not render deleted book on User List page with ALL books matching user on /api/list/<id>/<all> GET', function(done) {
  //         chai.request(server)
  //           .get('/api/list/1/all')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             res.should.be.json;
  //             done();
  //           });
  //       });

  //       it('should render User List page with ALL books matching title and user on /api/list/<id>/title/<title> GET', function(done) {
  //         chai.request(server)
  //           .get('/api/list/1/title/Title - Title 1')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             res.should.be.json;
  //             done();
  //           });
  //       });

  //       it('should render User List page with ALL books matching author and user on /api/list/<id>/author/<author> GET', function(done) {
  //         chai.request(server)
  //           .get('/api/list/1/author/Author - Author 1')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             res.should.be.json;
  //             done();
  //           });
  //       });

  //       it('should render User List page with ALL books matching category and user on /api/list/<id>/category/<category> GET', function(done) {
  //         chai.request(server)
  //           .get('/api/list/1/category/Vacation')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             res.should.be.json;
  //             done();
  //           });
  //       });

  //       it('should render User List page with ALL books matching status and user on /api/list/<id>/status/<status> GET', function(done) {
  //         chai.request(server)
  //           .get('/api/list/1/status/In Progress')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             res.should.be.json;
  //             done();
  //           });
  //       });
  //     });

  //     // POST requests.
  //     describe('User List Add', function() {
  //       it('should add existing library book to user list only on /api/list/add POST', function(done) {
  //         chai.request(server)
  //           .post('/api/list/add')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             done();
  //           });
  //       });

  //       it('should add new library book to both library and user list on /api/list/add POST', function(done) {   
  //         chai.request(server)
  //           .post('/api/list/add')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             done();
  //           });
  //       });

  //       it('should not add existing user list book to either library or user list only on /api/list/add POST', function(done) { 
  //         chai.request(server)
  //           .post('/api/list/add')
  //           .end((err, res) => {
  //             res.should.have.status(200);
  //             done();
  //           });
  //       });

  //     });

  //     // PUT requests.
  //     it('should update status for user list on /api/list/update PUT', function(done) { 
  //       chai.request(server)
  //         .put('/api/list/update')
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });
  // });
// });

          // res.body.should.be.a('array');
          // res.body[0].should.have.property('_id');
          // res.body[0].should.have.property('name');
          // res.body[0].should.have.property('lastName');
          // res.body[0].name.should.equal('Bat');
          // res.body[0].lastName.should.equal('man');
 