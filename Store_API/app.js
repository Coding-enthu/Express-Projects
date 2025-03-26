require("dotenv").config();

// async errors
require("express-async-errors");

const express = require("express");
app = express();

const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

const connectDB = require("./db/connect.js");
const productsRouter = require("./routes/products.routes.js");

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productsRouter);

//product routes

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

PORT = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB();
		console.log("Database connection successful...\n*****");
		app.listen(PORT, () => {
			console.log(`App listening at port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
