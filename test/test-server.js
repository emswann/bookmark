var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

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
    describe('Login', function() {
      it('should render home login page on / GET', function(done) {
        this.timeout(10000);
        chai.request(server)
          .get('/')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });

      it('should render existing user login page on /login GET', function(done) {
        chai.request(server)
          .get('/login')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });

      describe('Existing User Login Authentication', function() { 
        it('should render profile login page for successful login on /login POST', function(done) {
          chai.request(server)
            .post('/login')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });

        it('should render existing user login page with flash message for unsuccessful login on /login POST', function(done) {
          chai.request(server)
            .post('/login')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
      });   

      it('should render new user signup page on /signup GET', function(done) {
        chai.request(server)
          .get('/signup')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });

      describe('New User Signup Authentication', function() { 
        it('should render profile login page for successful signup on /signup POST', function(done) {
          chai.request(server)
            .post('/signup')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });

        it('should render new user sign page with flash message for unsuccessful signup on /signup POST', function(done) {
          chai.request(server)
            .post('/signup')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
      });  

      it('should render profile login page on /profile GET', function(done) {
        chai.request(server)
          .get('/profile')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });

      it('should render home login page on /logout GET', function(done) {
        chai.request(server)
          .get('/logout')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });
    });

    // describe('Book Search', function() {
    //   it('should render static Book Search page (no books) on /search GET', function(done) {
    //     chai.request(server)
    //       .get('/search')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         done();
    //       });
    //   });

    //   it('should render Book Search page with books matching title on /api/search/title/<title> GET', function(done) {
    //     chai.request(server)
    //       .get('/api/search/title/flowers')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         done();
    //       });
    //   });

    //   it('should render Book Search page with books matching author on /api/search/author/<author> GET', function(done) {
    //     chai.request(server)
    //       .get('/api/search/author/flowers')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         done();
    //       });
    //   });

    //   it('should render Book Search page with books matching subject on /api/search/subject/<subject> GET', function(done) {
    //     chai.request(server)
    //       .get('/api/search/subject/flowers')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         done();
    //       });
    //   });
    // });

    // describe('User List', function() {
    //   it('should render static User List page (no books) on /list GET', function(done) {
    //     chai.request(server)
    //       .get('/list')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         done();
    //       });
    //   });

    //   it('should render User List page with dropdown list matching possible categories for user on /api/list/<id>/category GET', function(done) {
    //     chai.request(server)
    //       .get('/api/list/1/category')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         done();
    //       });
    //   });

    //   it('should render User List page with dropdown list matching possible statuses for user on /api/list/<id>/status GET', function(done) {
    //     chai.request(server)
    //       .get('/api/list/1/status')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.should.be.json;
    //         done();
    //       });
    //   });

    //   describe('User List Search', function() {
    //     it('should render User List page with ALL books matching user on /api/list/<id>/<all> GET', function(done) {
    //       chai.request(server)
    //         .get('/api/list/1/all')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.should.be.json;
    //           done();
    //         });
    //     });

    //     it('should not render deleted book on User List page with ALL books matching user on /api/list/<id>/<all> GET', function(done) {
    //       chai.request(server)
    //         .get('/api/list/1/all')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.should.be.json;
    //           done();
    //         });
    //     });

    //     it('should render User List page with ALL books matching title and user on /api/list/<id>/title/<title> GET', function(done) {
    //       chai.request(server)
    //         .get('/api/list/1/title/Title - Title 1')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.should.be.json;
    //           done();
    //         });
    //     });

    //     it('should render User List page with ALL books matching author and user on /api/list/<id>/author/<author> GET', function(done) {
    //       chai.request(server)
    //         .get('/api/list/1/author/Author - Author 1')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.should.be.json;
    //           done();
    //         });
    //     });

    //     it('should render User List page with ALL books matching category and user on /api/list/<id>/category/<category> GET', function(done) {
    //       chai.request(server)
    //         .get('/api/list/1/category/Vacation')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.should.be.json;
    //           done();
    //         });
    //     });

    //     it('should render User List page with ALL books matching status and user on /api/list/<id>/status/<status> GET', function(done) {
    //       chai.request(server)
    //         .get('/api/list/1/status/In Progress')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           res.should.be.json;
    //           done();
    //         });
    //     });
    //   });

    //   describe('User List Add', function() {
    //     it('should add existing library book to user list only on /api/list/add POST', function(done) {
    //       chai.request(server)
    //         .post('/api/list/add')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           done();
    //         });
    //     });

    //     it('should add new library book to both library and user list on /api/list/add POST', function(done) {   
    //       chai.request(server)
    //         .post('/api/list/add')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           done();
    //         });
    //     });

    //     it('should not add existing user list book to either library or user list only on /api/list/add POST', function(done) { 
    //       chai.request(server)
    //         .post('/api/list/add')
    //         .end((err, res) => {
    //           res.should.have.status(200);
    //           done();
    //         });
    //     });

    //   });

    //   it('should update status for user list on /api/list/update PUT', function(done) { 
    //     chai.request(server)
    //       .put('/api/list/update')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         done();
    //       });
    //   });
    // });
  });
});

          // res.body.should.be.a('array');
          // res.body[0].should.have.property('_id');
          // res.body[0].should.have.property('name');
          // res.body[0].should.have.property('lastName');
          // res.body[0].name.should.equal('Bat');
          // res.body[0].lastName.should.equal('man');
 