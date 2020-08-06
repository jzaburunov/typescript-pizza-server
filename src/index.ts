// v TODO Create web server
// v Add logging
// Handle login route - controller router
// Handle route /pizzas/all - create controller class
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { initPassport } from "./auth";
import cors from "cors";
import bodyParser from "body-parser";
initPassport(passport);
import "./controllers/LoginController";
import { AppRouter } from "./router";

const appRouter = AppRouter.getInstance();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser());
app.use(cors());
app.use(passport.initialize());
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => {
        console.log("info", message);
      },
    },
  })
);

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
