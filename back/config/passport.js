let passport = require("passport");
let LocalStrategy = require("passport-local");
let user = require("../api/models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // 'user[email]',
      passwordField: "password" // 'user[password]'
    },
    (email, password, done) => {
      console.log(email);
      user
        .findOne({ email: email })
        .then(user => {
          if (!user || !user.comparePassword(password)) {
            // return done(null, false, { errors: { 'email or password': 'is invalid' } });
            return done(null, false, {
              errors: "email or password is invalid"
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
