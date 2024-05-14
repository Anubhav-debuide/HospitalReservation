const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    roomType: { type: String, enum: ['Normal Room', 'Oxygen Room', 'ICU'], required: true },
    reservedAt: { type: Date, default: Date.now }
});


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports =  Reservation 