const express = require("express");
require("dotenv").config();
const path = require("path");
const homeRoute = require("./routes/home");
const taskRoutes = require("./routes/task");
const db = require("./config/database");
const TaskModel = require("./model/task");
const app = express();

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//VIEW ENGINE
app.set("view engine", "ejs");

//ROUTES
app.use(homeRoute);
app.use(taskRoutes);
app.get("*", (req, res, next) => {
  res.render("404");
});

//DATABASE
db.sync()
  .then(() => {
    console.log(`The database has been successfully synchronized!`);
  })
  .catch((err) => {
    console.log(err);
  });

//LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});
