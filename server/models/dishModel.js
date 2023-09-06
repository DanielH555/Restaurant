const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');


const dishes = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    status: { type: Boolean, default: false }
}, { timestamps: true });

const Dishes = new mongoose.model('dishes', dishes);

module.exports = Dishes;
