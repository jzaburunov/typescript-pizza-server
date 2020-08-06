// TODO Create web server
// Add logging
// Handle login route - controller router
// Handle route /pizzas/all - create controller class
import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => {
        console.log("info", message);
      },
    },
  })
);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
