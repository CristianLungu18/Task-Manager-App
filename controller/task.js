const Task = require("../model/task");

exports.getTasks = async (req, res, next) => {
  try {
    res.status(200);
    const Tasks = await Task.findAll();
    res.render("home", { Tasks, alert: "" });
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};

exports.postTask = async (req, res, next) => {
  const Tasks = await Task.findAll();
  const { name } = req.body;
  if (!name) {
    return res.render("home", { Tasks, alert: "Please enter a task!" });
  }
  const newTask = Task.build({ name });
  try {
    await newTask.save();
    res.redirect("/");
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};

exports.getTaskByID = async (req, res, next) => {
  const taskID = req.params.id;
  try {
    const myTask = await Task.findOne({ where: { id: taskID } });
    res.render("edit-task", { myTask, alert: "" });
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};

exports.updateTask = async (req, res, next) => {
  const taskID = req.params.id;
  const myTask = await Task.findOne({ where: { id: taskID } });
  const { name, completed } = req.body;
  if (!name) {
    return res.render("edit-task", {
      myTask,
      alert: "Please do not leave the name field empty!",
    });
  }
  myTask.name = name;
  if (completed) {
    myTask.completed = completed;
  } else {
    myTask.completed = "off";
  }
  try {
    res.status(200);
    await myTask.save();
    res.redirect("/");
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};

exports.removeTask = async (req, res, next) => {
  const taskID = req.params.id;
  if (taskID) {
    try {
      res.status(200);
      const myTask = await Task.findOne({ where: { id: taskID } });
      await myTask.destroy();
      res.redirect("/");
    } catch (err) {
      res.status(400);
      console.log(err);
    }
  }
};
