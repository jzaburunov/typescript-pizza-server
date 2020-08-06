import mongoose from "mongoose";

export function initDatabase() {
  mongoose.connect("mongodb://localhost:27017/PizzaLab");
  let db = mongoose.connection;

  db.once("open", (err: Error) => {
    if (err) {
      throw err;
    }

    console.log("MongoDB ready!");
  });

  db.on("error", (err: Error) => console.log(`Database error: ${err}`));
}
