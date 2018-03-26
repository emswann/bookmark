const chai     = require('chai');
const chaiHttp = require('chai-http');
 
const expect   = require('chai').expect;
 
// Register the plugin
chai.use(chaiHttp);

var server = require('../server');

describe('hooks', function() {
  before(function(done) {
    done();
  });

  after(function(done) {
    done();
  });

  beforeEach(function(done) {
    setTimeout(function() {
      done();
    }, 1800);
  });

  afterEach(function(done) {
    done();
  });

  describe('Bookmark', function() {

    describe('Login', function() {
      it('should render home login page on / GET', function(done) {
        chai.request(server)
          .get('/')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('<p>Login or Register with:</p>');
            expect(res.text).to.not.contain('<p>This is a test</p>');
            done();
          });
      });

      it('should render existing user login page on /login GET', function(done) {
        chai.request(server)
          .get('/login')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('<form class="login-form" action="/login" method="post">');
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
              expect(res.text).to.contain('</span> Your Profile</h1>'); 
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
              expect(res.text).to.contain('<form class="login-form" action="/login" method="post">');
              expect(res.text).to.contain('<div class="alert alert-danger">Oops! Wrong password.</div>');
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
            expect(res.text).to.contain('<form action="/signup" method="post">');
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
              expect(res.text).to.contain('</span> Your Profile</h1>'); 
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
              expect(res.text).to.contain('<form class="login-form" action="/login" method="post">');
              expect(res.text).to.contain('<div class="alert alert-danger">That email is already taken.</div>');
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
            expect(res.text).to.contain('</span> Your Profile</h1>'); 
            done();
          })
      });

      it('should render home login page on /logout GET', function(done) {
        chai.request(server)
          .get('/logout')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('<p>Login or Register with:</p>');
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
            expect(res.text).to.contain('<div id="search-results">');
            done();
          });
      });

      it('should render Book Search page with books matching title and not in user library on /api/search/<id>/title/<title> GET', function(done) {
        chai.request(server)
          .get('/api/search/1/title/flowers')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('Arranging Flowers');
            expect(res.text).to.contain('Show Me How Limited');
            expect(res.text).to.not.contain('Familiar flowers of field and garden');
            expect(res.text).to.not.contain('Ferdinand Schuyler Mathews');
            done();
          });
      });
    
      it('should render Book Search page with books matching author and not in user library on /api/search/<id>/author/<author> GET', function(done) {
        chai.request(server)
          .get('/api/search/1/author/flowers')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('Murders in the United States');
            expect(res.text).to.contain('R. Barri Flowers,H. Loraine Flowers');
            expect(res.text).to.not.contain('Forget Me Not');
            expect(res.text).to.not.contain('Sarah Flowers');
            done();
          });
      });

      it('should render Book Search page with books matching subject and not in user library on /api/search/<id>/subject/<subject> GET', function(done) {
        chai.request(server)
          .get('/api/search/1/subject/flowers')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
            expect(res.text).to.contain('New Bach Flower Body Maps');
            expect(res.text).to.contain('Dietmar Krc$mer,Helmut Wild');
            expect(res.text).to.not.contain('The New Flower Expert');
            expect(res.text).to.not.contain('D. G. Hessayon');
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
            expect(res.text).to.contain('<div id="list-results">');
            done();
          });
      });
    });
  });
});

  //     it('should render User List page with dropdown list matching possible categories for user on /api/list/<id>/category GET', function(done) {
  //     });

  //     it('should render User List page with dropdown list matching possible statuses for user on /api/list/<id>/status GET', function(done) {
  //     });

  //     it('should render User List page with ALL books matching user on /api/list/<id>/<all> GET', function(done) {
  //     });

  //     it('should not render deleted book on User List page with ALL books matching user on /api/list/<id>/<all> GET', function(done) {
  //     });

  //     it('should render User List page with ALL books matching title and user on /api/list/<id>/title/<title> GET', function(done) {
  //     });

  //     it('should render User List page with ALL books matching author and user on /api/list/<id>/author/<author> GET', function(done) {
  //     });

  //     it('should render User List page with ALL books matching category and user on /api/list/<id>/category/<category> GET', function(done) {
  //     });

  //     it('should render User List page with ALL books matching status and user on /api/list/<id>/status/<status> GET', function(done) {
  //     });

  //     it('should add existing library book to user list only on /api/list/add POST', function(done) {
  //     });

  //     it('should add new library book to both library and user list on /api/list/add POST', function(done) {   
  //     });

  //     it('should not add existing user list book to either library or user list only on /api/list/add POST', function(done) { 
  //     });

  //     it('should update status for user list on /api/list/update PUT', function(done) { 
  //     });
