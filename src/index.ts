// TODO Create web server
// Add logging
// Handle login route - controller router
// Handle route /pizzas/all - create controller class
import express from "express";

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
