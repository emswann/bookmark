var LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, db) => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => 
    db.User.findAll({where: {id: id}})
    .then((err, user) => done(err, user))
    .catch(error => console.log(error)));

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back entire request to the callback
  }, (req, email, password, done) => {
    process.nextTick(() => {
      db.User.findOne({ 'local.email' :  email }, (err, user) => {
        if (err) return done(err);

        if (user) 
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

        var newUser = new User();

        newUser.local.email    = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save(err => {
          if (err) throw err;
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // pass back entire request to the callback
  }, (req, email, password, done) => {
    db.User.findOne({ 'local.email' :  email }, (err, user) => {
      if (err) return done(err);

      if (!user) 
        return done(null, false, req.flash('loginMessage', 'No user found.')); 

      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return done(null, user);
    })
  }));
};
