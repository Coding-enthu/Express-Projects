const mongoose = require("mongoose");

const connectDB = () => {
	return mongoose.connect(`${process.env.MONGODB_URI}/Store`);
};

module.exports = connectDB;
