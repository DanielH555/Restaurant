const Dishes = require('../models/dishModel');
//undone
async function add(req, res) {

    const { name, description, price, img } = req.body;
    const dishes = {
        name,
        description,
        price,
        img
    }

    try {
        const result = await Dishes.create(dishes);
        res.send(result);
    } catch (error) {

        res.status(400).send(error.details[0].message);
    }
}

//done
async function gettingDishes(req, res) {

    try {
        const result = await Dishes.find();
        res.send(result);
    } catch (error) {
        throw error;
    }

}
//done
async function getById(req, res) {
    const dish = req.params.name;
    console.log(dish);

    try {
        const searchedDish = { name: { $regex: new RegExp(dish) } };
        const result = await Dishes.find(searchedDish);
        res.send(result);
    } catch (error) {
        throw error;
    }
}

//done
async function updating(req, res) {
    const id = req.params.id;
    try {
        await Dishes.findByIdAndUpdate(id, req.body);
    } catch (error) { throw error };
    res.send('The dish was successfully updated.');
}


//done
async function deleting(req, res) {

    const { id } = req.params;
    console.log(id);
    try {
        const results = await Dishes.findByIdAndDelete({ _id: id });
        console.log(results);
    } catch (error) {
        throw new Error;
    }
    res.send('The dish was deleted successfully.')
};

module.exports = { add, gettingDishes, updating, deleting, getById };


