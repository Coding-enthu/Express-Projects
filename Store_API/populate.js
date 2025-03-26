require("dotenv").config();

const connectDB = require("./db/connect.js");
const Product = require("./models/product.model.js");

const jsonProducts = require("./products.json");

const start = async ()=>{
    try {
        await connectDB(`${process.env.MONGODB_URI}/Store`);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("Success!!!!!!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();