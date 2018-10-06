const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id }, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passportField: 'password'
}, function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Username not found' });

    bcrypt.compare(password, user.password, function(err, res) {
      if (!res) return done(null, false, { message: 'Invalid Password' });

      let userDetails = {
        email:    user.email,
        username: user.username,
        id:       user.id
      };

      return done(null, userDetails, { message: 'Login Successful' });
    });
  });
}));
