// v TODO Create web server
// v Add logging
// v Handle login route - controller router
// * Handle route /pizzas/all - create controller class
// Handle signUp route
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { initPassport } from "./auth";
import { initDatabase } from "./database";
import cors from "cors";
import bodyParser from "body-parser";
initPassport(passport);
import "./controllers/LoginController";
import "./controllers/PizzaController";
import { AppRouter } from "./router";

// TODO Use passport initialize

const appRouter = AppRouter.getInstance();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser());
app.use(cors()); // For cors request from localhost:3000
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
initDatabase();

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
