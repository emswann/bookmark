const chai       = require('chai');
const chaiHttp   = require('chai-http');
// const chaiEnzyme = require('chai-enzyme');
 
const expect   = require('chai').expect;
 
// Register the plugin
chai.use(chaiHttp);
// chai.use(chaiEnzyme());

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
    describe('Login', function() {
      it('should render home login page on / GET', function(done) {
        chai.request(server)
          .get('/')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('<p>Login or Register with:</p>').to.exist;
            done();
          });
      });

      it('should render existing user login page on /login GET', function(done) {
        chai.request(server)
          .get('/login')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('<form class="login-form" action="/login" method="post">').to.exist;
            done();
          });
      });

      describe('Existing User Login Authentication', function() { 
        it('should render profile login page for successful login on /login POST', function(done) {
          chai.request(server)
            .post('/login')
            .send({'email': 'test@hotmail.com', 
                   'password': 'test'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.html;
              expect('</span> Your Profile</h1>').to.exist; 
              done();
            });
        });

        it('should render existing user login page with flash message for unsuccessful login on /login POST', function(done) {
          chai.request(server)
            .post('/login')
            .send({'email': 'test@hotmail.com', 
                   'password': 'wrongpassword'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.html;
              expect('<form class="login-form" action="/login" method="post">').to.exist;
              expect('<div class="alert alert-danger">Oops! Wrong password.</div>').to.exist;
              done();
            });
        });
      });   

      it('should render new user signup page on /signup GET', function(done) {
        chai.request(server)
          .get('/signup')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('<form action="/signup" method="post">').to.exist;
            done();
          });
      });

      describe('New User Signup Authentication', function() { 
        it('should render profile login page for successful signup on /signup POST', function(done) {
          chai.request(server)
            .post('/signup')
            .send({'email': 'test2@hotmail.com', 
                   'password': 'test'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.html;
              expect('</span> Your Profile</h1>').to.exist; 
              done();
            });
        });

        it('should render new user sign page with flash message for unsuccessful signup on /signup POST', function(done) {
          chai.request(server)
            .post('/signup')
            .send({'email': 'test@hotmail.com', 
                   'password': 'test'})
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res).to.be.html;
              expect('<form class="login-form" action="/login" method="post">').to.exist;
              expect('<div class="alert alert-danger">That email is already taken.</div>').to.exist;
              done();             
            });
        });
      });  

      it('should render profile login page on /profile GET', function(done) {
        chai.request(server)
          .get('/profile')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('</span> Your Profile</h1>').to.exist;            
            done();
          });
      });

      it('should render home login page on /logout GET', function(done) {
        chai.request(server)
          .get('/logout')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('<p>Login or Register with:</p>').to.exist;
            done();
          });
      });
    });
    
    // Book Search tests.
    describe('Book Search', function() {

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

      it('should render Book Search page with books matching title and not in user library on /api/search/<id>/title/<title> GET', function(done) {
        chai.request(server)
          .get('/api/search/1/title/flowers')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('Arranging Flowers').to.exist;
            expect('Show Me How Limited').to.exist;
            // expect('Familiar flowers of field and garden').to.not.exist;
            // expect('Ferdinand Schuyler Mathews').to.not.exist;
            done();
          });
      });
    
      it('should render Book Search page with books matching author and not in user library on /api/search/<id>/author/<author> GET', function(done) {
        chai.request(server)
          .get('/api/search/1/author/flowers')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('Murders in the United States').to.exist;
            expect('R. Barri Flowers,H. Loraine Flowers').to.exist;
            // expect('Forget Me Not').to.not.exist;
            // expect('Sarah Flowers').to.not.exist;
            done();
          });
      });

      it('should render Book Search page with books matching subject and not in user library on /api/search/<id>/subject/<subject> GET', function(done) {
        chai.request(server)
          .get('/api/search/1/subject/flowers')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('New Bach Flower Body Maps').to.exist;
            expect('Dietmar Krc$mer,Helmut Wild').to.exist;
            // expect('The New Flower Expert').to.not.exist;
            // expect('D. G. Hessayon').to.not.exist;
            done();
          });
      });

    });

    // User List tests.
    describe('User List', function() {
      // GET requests.
      it('should render static User List page (no books) on /list GET', function(done) {
        chai.request(server)
          .get('/list')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect('<div id="list-results">').to.exist;
            done();
          });
      });
    });
  });
});




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
            //  expect(res).to.be.a('array');
            // expect(res.body[0]).to.have.property('title');
            // expect(res.body[0]).to.have.property('author');
            // expect(res.res.body[0]).name.to.be.equal('Bat');
            // expect(res.res.body[0]).author.to.be.equal('Bat');