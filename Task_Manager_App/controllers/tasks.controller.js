const Task = require("../models/task.models.js");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError } = require("../Errors/custom-error.js");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json({ tasks });
	// console.log(tasks[0], `\n${tasks[1].name}`)
});

const createNewTask = asyncWrapper(async (req, res) => {
	// const {name, completed} = req.body
	const task = await Task.create(req.body);
	res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
	// console.log(req)
	const taskID = req.params.id;
	const task = await Task.findOne({ _id: taskID });

	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	}

	res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	//Alternate update way

	// const task = await Task.findById(taskId)
	// task.name = req.body.name
	// task.completed = req.body.completed
	// await task.save()

	const { id: taskId } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	}

	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const taskId = req.params.id;
	const task = await Task.findOneAndDelete({ _id: taskId });

	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	}

	res.status(200).json({ task });
	// res.status(200).json( {task: null, status: success} )
});

module.exports = {
	getAllTasks,
	createNewTask,
	getTask,
	updateTask,
	deleteTask,
};
