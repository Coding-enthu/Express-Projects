const connectDB = require("./db/connect.js");
const express = require("express");
const taskRouter = require("./routes/task.router.js");
const dotenv = require("dotenv");
const notFound = require("./middleware/not-found.js");
const errorHandlerMidlleware = require("./middleware/error-handler.js");

dotenv.config();

const app = express();

const PORT = 3000;

//middlewares
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", taskRouter);

app.use(notFound);
app.use(errorHandlerMidlleware);

const start = async () => {
	try {
		await connectDB();
		console.log("MONGODB connected...");

		app.listen(PORT, () => {
			console.log(`*****\nApp listening at port: ${PORT}...\n*****`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
