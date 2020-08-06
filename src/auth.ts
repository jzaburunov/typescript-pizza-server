const LocalStrategy = require("passport-local").Strategy;

export const initPassport = () => {
// TODO Fix any
export const initPassport = (passport: any) => {
  console.log("iniPassport");
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done: Function) => {
        // TODO Use db to see if user is there
        done(null, "ololo", "OloData");
      }
    )
  );
};
