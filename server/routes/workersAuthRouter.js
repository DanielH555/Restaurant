const { getAllWorkers, createWorker, updateWorker, deleteWorker } = require('../controllers/workersAuthController')
const router = require('express').Router()
const { jwtAuth } = require('../middlewares/jwtAuth')

router.post('/', jwtAuth, getAllWorkers)

router.post('/add', jwtAuth, createWorker)

router.put('/update/:id', jwtAuth, updateWorker)

router.delete('/delete/:id', jwtAuth, deleteWorker)

module.exports = router


