import { Request, Response, NextFunction } from "express";
import { controller, get } from "../decorators";

@controller("/auth")
export class LoginController {
  @get("/login")
  login(req: Request, res: Response, next: NextFunction) {
    // Do login staff
    res.send("login wx");
  }
}
