const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    petName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    contactNumber: { type: String, required: true },
    reminderSent: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
