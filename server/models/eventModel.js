const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');


const Events = mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    price: Number,

    status: { type: Boolean, default: false }
}, { timestamps: true });

const events = new mongoose.model('events', Events);

module.exports = events;
