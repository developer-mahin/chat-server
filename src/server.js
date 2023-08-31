require("dotenv").config();
const colors = require("colors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = require("./app");

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connect successfully".blue.bold);
  })
  .catch((err) => {
    console.log(err.message.red.bold);
  });

app.listen(port, () => {
  console.log(
    `Server is running successfully http://localhost:5000/`.white.bold
  );
});
