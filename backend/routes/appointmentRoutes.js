const express = require('express');
const { createAppointment, getAppointments, sendReminder } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/appointments', createAppointment);
router.get('/appointments', getAppointments);
router.post('/appointments/:id/reminder', sendReminder);

module.exports = router;
