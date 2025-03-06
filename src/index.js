const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/config/db');
const appointmentRoutes = require('../backend/routes/appointmentRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
