const express = require("express");
const {
	getAllTasks,
	createNewTask,
	getTask,
	updateTask,
	deleteTask,
} = require("../controllers/tasks.controller.js");

router = express.Router();

// at api/v1/tasks
router.route("/").get(getAllTasks).post(createNewTask);

// at api/v1/tasks:id
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
