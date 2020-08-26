import { Request, Response, NextFunction } from "express";
import { controller, post } from "../decorators";
import passport from "passport";

@controller("/auth")
export class LoginController {
  @post("/login")
  login(req: Request, res: Response, next: NextFunction) {
    // Do login staff
    // Connect DB
    // See if hash is equal to one stored in the db
    // If yes, set session token
    // if no, send auth error
    return passport.authenticate("local-signin", (err, token, userData) => {
      if (err) {
        res.status(401).send("Forbidden. Please, login");
      } else {
        res.send({
          success: true,
          token,
          user: {
            username: userData.username,
            roles: userData.roles,
          },
        });
      }
    })(req, res, next);
  }
}
