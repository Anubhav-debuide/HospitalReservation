const Reservation = require("../models/Reservation.model")
const Hospital = require("../models/hospital.model");

const {getAllResourcesFromDB}  = require("../services/Hospital.service")

const getAllReservationFromDB = async()=>{
    const reservations = await Reservation.find();
    return reservations;
}

async function makeReservationService(roomType) {
    console.log(roomType,"roomTypr")
    const hospital = await getAllResourcesFromDB();
    if (!hospital) {
      throw new Error('Hospital not found');
    }
  
    let updatedHospital;
    switch (roomType) {
      case 'Normal Room':
        if (hospital.normalRooms > 0 && hospital.flatBeds >= 1 && hospital.normalMasks >= 2) {
          updatedHospital = await Hospital.findByIdAndUpdate(hospital._id, {
            $inc: { normalRooms: -1, flatBeds: -1, normalMasks: -2 }
          }, { new: true });
          console.log(updatedHospital,"updated")
        } else {
          return ('Not enough resources for Normal Room');
        }
        break;
      case 'Oxygen Room':
        if (hospital.oxygenRooms > 0 && hospital.oxygenCylinders>1 &&hospital.reclinerBeds>0 && hospital.nonRebreatherMasks>1) {
          updatedHospital = await Hospital.findByIdAndUpdate(hospital._id, {
            $inc: { oxygenRooms: -1, oxygenCylinders: -2, reclinerBeds: -1, nonRebreatherMasks: -2 }
          }, { new: true });
        } else {
          return ('Not enough resources for Oxygen Room');
        }
        break;
      case 'ICU':
        if (hospital.icuRooms > 0 && hospital.ventilators>0 && hospital.oxygenCylinders>0 && hospital.reclinerBeds>0) {
          updatedHospital = await Hospital.findByIdAndUpdate(hospital._id, {
            $inc: { icuRooms: -1, ventilators: -1, oxygenCylinders: -1, reclinerBeds: -1 }
          }, { new: true });
        } else {
          return ('Not enough resources for ICU');
        }
        break;
      default:
        throw new Error('Invalid room type');
    }
  
    const reservation = new Reservation({ roomType });
    await reservation.save();

    // const reservation = Reservation.create({roomType})
  
    return `Reservation made for ${roomType}`;
  }
  

module.exports = {
    getAllReservationFromDB,
    makeReservationService 
}