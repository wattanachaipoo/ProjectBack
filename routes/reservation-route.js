const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const reservationController = require('../controllers/reservation-controller')

router.get('/', authenticate, reservationController.getByUser)
router.post('/', authenticate, reservationController.reservation)
router.get('/show', authenticate, reservationController.getAllReservations)

module.exports = router