const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');


const workers = mongoose.Schema({
    name: String,
    salary: Number,
    status: { type: Boolean, default: false }
}, { timestamps: true });

const Workers = new mongoose.model('workers', workers);

module.exports = Workers;
