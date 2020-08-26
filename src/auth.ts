import PassportLocal from "passport-local";
import jwt from "jsonwebtoken";
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
        const user = await User.findOne({
          email,
        });
        if (user) {
          const result = await user.authenticate(password);
          if (result) {
            const payload = {
              sub: user.id,
            };
            const token = jwt.sign(payload, "top secret");
            done(null, token, user);
          }
        }
      }
    )
  );
};

export const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, "top secret", (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;
    User.findById(userId).then((user) => {
      if (!user) {
        return res.status(401).end();
      }

      req.user = user;

      return next();
    });
  });
};
