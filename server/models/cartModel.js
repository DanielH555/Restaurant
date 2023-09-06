const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const cart = mongoose.Schema({
    userId: String,
    dishId: String,
    quantity: Number
});

const Cart = new mongoose.model('cart', cart);

module.exports = Cart;
