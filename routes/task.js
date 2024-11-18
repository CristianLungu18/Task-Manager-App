const express = require("express");
const router = express.Router();
const taskController = require("../controller/task");

router.get("/edit-task/:id", taskController.getTaskByID);

router.post("/edit-task/:id", taskController.updateTask);

router.get("/remove/:id", taskController.removeTask);

module.exports = router;
