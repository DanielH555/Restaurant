const { gettingDishes, add, updating, deleting, getById } = require('../controllers/dishesController')
const router = require('express').Router()
const { jwtAuth } = require('../middlewares/jwtAuth')

router.get('/', gettingDishes)

router.get('/name/:name', getById)
router.post('/add', jwtAuth, add)
router.put('/update/:id', updating)
router.delete('/delete/:id', deleting)
router.get('*')

module.exports = router


