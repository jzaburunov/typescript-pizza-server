import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export function loginRequired(req: Request, res: Response, next: NextFunction) {
  // TODO check Bearer
  console.log("checking login", req);
  if (!req.headers.authorization) {
    res.status(401).end();
  } else {
    const token = req.headers.authorization.split(" ")[1];
    // TODO Use config for a secret
    jwt.verify(token, "top secret", async (err, decoded) => {
      if (err) {
        res.status(401).end();
      }
      const userId = decoded?.sub;
      const user = await User.findById(userId);
      if (user) {
        next();
      } else {
        res.status(401).end();
      }
    });
  }
}
