const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = () => {
	return mongoose.connect(`${process.env.MONGODB_URI}/Task-Manager`);
};

module.exports = connectDB;
