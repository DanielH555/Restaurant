const { gettingDishes, addToCart, updating } = require('../controllers/cartController')
const router = require('express').Router()
const { jwtAuth } = require('../middlewares/jwtAuth')

router.post('/', jwtAuth, gettingDishes)

router.post('/addToCart', jwtAuth, addToCart)
router.put('/update', jwtAuth, updating)


module.exports = router


