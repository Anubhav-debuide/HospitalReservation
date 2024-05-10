const { Hospital, Reservation } = require('../models/hospital.model');

const getAllReservationFromDB = async()=>{
    const reservations = await Reservation.find();
    return reservations;
}

const getAllResourcesFromDB = async()=>{
    const hospital = await Hospital.findOne();
    return hospital;
}

module.exports = {
    getAllReservationFromDB,
    getAllResourcesFromDB,
}