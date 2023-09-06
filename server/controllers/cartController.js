
const Cart = require('../models/cartModel');
const Dishes = require('../models/dishModel');
//undone
async function addToCart(req, res) {

    const { userId, dishId, quantity } = req.body;
    const cart = {
        userId,
        dishId,
        quantity
    }
    console.log(cart);
    try {
        const result = await Cart.create(cart);
        res.send(result);
    } catch (error) {

        res.status(400).send(error.details[0].message);
    }
}

//done
async function gettingDishes(req, res) {

    try {
        let array = [];
        const result = await Cart.find({ userId: req.body.userId });
        for (let dish of result) {
            const OneDish = await Dishes.findOne({ _id: dish.dishId });
            let dish1 = {
                name: OneDish.name,
                description: OneDish.description,
                price: OneDish.price,
                quantity: dish.quantity
            }
            array.push(dish1);
        }
        res.send(array);
    } catch (error) {
        throw error;
    }

}

//done
async function updating(req, res) {

    const { userId, dishId, quantity } = req.body;
    const cart = {
        userId,
        dishId,
        quantity
    }
    try {
        await Cart.findOneAndUpdate({ userId: userId, dishId: dishId }, cart);
        res.send('The dish was successfully updated.');
    } catch (error) { throw error };
}


module.exports = { addToCart, gettingDishes, updating };


