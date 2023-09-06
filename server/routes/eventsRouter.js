const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController.js')
const router = require('express').Router()
const { jwtAuth } = require('../middlewares/jwtAuth')

router.post('/', jwtAuth, getAllEvents)

router.post('/add', jwtAuth, createEvent)

router.put('/update/:id', jwtAuth, updateEvent)

router.delete('/delete/:id', jwtAuth, deleteEvent)

module.exports = router


