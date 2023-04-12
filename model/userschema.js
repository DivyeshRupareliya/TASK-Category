const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/divyesh");

const userschema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    discount: {
        type: String
    },
    rating: {
        type: String
    },
    stock: {
        type: String
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    thumbnail: {
        type: String
    },
    images: {
        type: String
    }
});

const model = mongoose.model('categories', userschema);

module.exports = model;