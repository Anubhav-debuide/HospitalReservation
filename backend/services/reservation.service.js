const Reservation = require("../models/Reservation.model")
const hospitalService = require("../services/Hospital.service");

class ReservationService{
  async getAllReservationFromDB (){
    const reservations = await Reservation.find();
    return reservations;
  }


  async makeReservationService(roomType) {
    const hospital = await hospitalService.getAllResourcesFromDB();
    if (!hospital) {
      throw new Error('Hospital not found');
    }
  
    let updatedHospital;
    switch (roomType) {
      case 'Normal Room':
        if (hospital.normalRooms > 0 && hospital.flatBeds >= 1 && hospital.normalMasks >= 2) {
          updatedHospital = { $inc: { normalRooms: -1, flatBeds: -1, normalMasks: -2 }}
        } else {
          return ('Not enough resources for Normal Room');
        }
        break;
      case 'Oxygen Room':
        if (hospital.oxygenRooms > 0 && hospital.oxygenCylinders>1 &&hospital.reclinerBeds>0 && hospital.nonRebreatherMasks>1) {
          updatedHospital = {$inc: { oxygenRooms: -1, oxygenCylinders: -2, reclinerBeds: -1, nonRebreatherMasks: -2 }}

        } else {
          return ('Not enough resources for Oxygen Room');
        }
        break;
      case 'ICU':
        if (hospital.icuRooms > 0 && hospital.ventilators>0 && hospital.oxygenCylinders>0 && hospital.reclinerBeds>0) {
          updatedHospital = {$inc: { icuRooms: -1, ventilators: -1, oxygenCylinders: -1, reclinerBeds: -1 }}
        } else {
          return ('Not enough resources for ICU');
        }
        break;
      default:
        throw new Error('Invalid room type');
    }


    await hospitalService.upDateResources(hospital._id, updatedHospital);
    const reservation = new Reservation({ roomType });
    await reservation.save();
    return `Reservation made for ${roomType}`;
  }
  

}


module.exports = new ReservationService();