const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name must be provided"]
    },
    price: {
        type: Number,
        required: [true, "Price must me provided"]
    },
    featured:{
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported"
        }
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);