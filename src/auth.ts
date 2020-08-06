import PassportLocal from "passport-local";
const LocalStrategy = PassportLocal.Strategy;

import { User, IUser } from "./models/User";

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
      async (req, email, password, done: Function) => {
        // TODO Use db to see if user is there
        const user = await User.findOne({
          email,
        });
        if (user) {
          const result = await user.authenticate(password);
          if (result) {
            const token = "ololo";
            done(null, token, user);
          }
        }
      }
    )
  );
};
