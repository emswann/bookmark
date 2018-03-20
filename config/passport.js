const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, db) => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => 
    db.User.findById(id)
    .then((user) => done(null, user))
    .catch(error => done(error, false)));

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back entire request to the callback
  }, (req, email, password, done) => {
    process.nextTick(() => {
      db.User.findOne({where: {email: email}})
      .then(user => { 
        if (user)
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

        var userPassword = generateHash(password);
 
        var data = { 
          email: email,
          password: userPassword,
        };
 
        db.User.create(data)
        .then((newUser, created) => { 
          if (!newUser) return done(null, false);

          if (newUser) return done(null, newUser); 
        }); 
      }) 
    })
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back entire request to the callback
  }, (req, email, password, done) => {
    db.User.findOne({where: {email: email}})
    .then(user => { 
      if (!user) 
        return done(null, false, req.flash('loginMessage', 'No user found.')); 

      if (!user.validPassword(password, user.password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return done(null, user);
    })
  }));
};
