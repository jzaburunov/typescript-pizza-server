import { Request, Response, NextFunction } from "express";
import { controller, get } from "../decorators";
import passport from "passport";

@controller("/auth")
export class LoginController {
  @get("/login")
  login(req: Request, res: Response, next: NextFunction) {
    // Do login staff
    // Connect DB
    // See if hash is equal to one stored in the db
    // If yes, set session token
    // if no, send auth error
    return passport.authenticate("local-signin", (err, user, userData) => {
      // console.log(userData);
      // console.log(err);
      if (err) {
        res.status(401).send("Forbidden. Please, login");
      } else {
        res.send(`You are welcome, ${user} with data: ${userData}`);
      }
    })(req, res, next);
  }
}
