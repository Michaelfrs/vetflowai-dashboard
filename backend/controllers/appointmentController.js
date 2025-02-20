const Appointment = require('../models/Appointment');
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.sendReminder = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }

        await client.messages.create({
            body: `Reminder: You have an appointment for ${appointment.petName} on ${appointment.date}.`,
            from: process.env.TWILIO_PHONE,
            to: appointment.contactNumber,
        });

        appointment.reminderSent = true;
        await appointment.save();

        res.status(200).json({ success: true, message: 'Reminder sent!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
