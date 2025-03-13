import express from "express"; // ✅ Correct for ES Modules

import { createAppointment, getAppointments, sendReminder } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointments', createAppointment);
router.get('/appointments', getAppointments);
router.post('/appointments/:id/reminder', sendReminder);

export default router;

