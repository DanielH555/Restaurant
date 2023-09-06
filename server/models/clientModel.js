const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');


const Clients = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String,
    admin: { type: Boolean, default: false },
    confirmPassword: String,
    status: { type: Boolean, default: false }
}, { timestamps: true });

const clients = new mongoose.model('users', Clients);

module.exports = clients;
