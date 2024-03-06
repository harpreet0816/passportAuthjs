// passportConfig.js
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./database.js");

function initializingPassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // console.log("username, password", username, password)
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        // Add your password validation logic here
        if (user.password === password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = { initializingPassport };
