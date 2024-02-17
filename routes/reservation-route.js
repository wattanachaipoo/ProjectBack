const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const reservationController = require('../controllers/reservation-controller')

router.get('/', authenticate, reservationController.getByUser)
router.post('/', authenticate, reservationController.reservation)
router.get('/show', reservationController.getAllReservations)
router.put('/mo',reservationController.updateReservation) // เพิ่ม middleware authenticate ที่นี่
router.get('/history',reservationController.getAll) // เพิ่ม middleware authenticate ที่นี่

module.exports = router
