// const { Hospital, Reservation } = require('../models/hospital.model');
const Hospital = require("../models/hospital.model");
const Reservation = require("../models/Reservation.model")


const {getAllReservationFromDB, makeReservationService} = require("../services/reservation.service")
const {getAllResourcesFromDB} = require("../services/Hospital.service")

async function getAllReservations(req, res) {
  try {
    const reservations = await getAllReservationFromDB()
    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching reservations' });
  }
}

async function getAllResources(req, res) {
  try {
    const hospital  = await getAllResourcesFromDB();
    res.json(hospital);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching resources' });
  }
}

// async function makeReservation(req, res) {
//   const roomType = req.body.roomType;
//   try {
//     const hospital = await getAllResourcesFromDB();
//     if (!hospital) {
//       return res.status(404).json({ message: 'Hospital not found' });
//     }

//     let updatedHospital;
//     switch (roomType) {
//       case 'Normal Room':
//         if (hospital.normalRooms > 0 && hospital.flatBeds >= 1 && hospital.normalMasks >= 2) {
//           updatedHospital = await Hospital.findByIdAndUpdate(hospital._id, {
//             $inc: { normalRooms: -1, flatBeds: -1, normalMasks: -2 }
//           }, { new: true });
//         } else {
//           return res.status(400).json({ message: 'Not enough resources for Normal Room' });
//         }
//         break;
//       case 'Oxygen Room':
//         if (hospital.oxygenRooms > 0) {
//           updatedHospital = await Hospital.findByIdAndUpdate(hospital._id, {
//             $inc: { oxygenRooms: -1, oxygenCylinders: -2, reclinerBeds: -1, nonRebreatherMasks: -2 }
//           }, { new: true });
//         } else {
//           return res.status(400).json({ message: 'Not enough resources for Oxygen Room' });
//         }
//         break;
//       case 'ICU':
//         if (hospital.icuRooms > 0) {
//           updatedHospital = await Hospital.findByIdAndUpdate(hospital._id, {
//             $inc: { icuRooms: -1, ventilators: -1, oxygenCylinders: -1, reclinerBeds: -1 }
//           }, { new: true });
//         } else {
//           return res.status(400).json({ message: 'Not enough resources for ICU' });
//         }
//         break;
//       default:
//         return res.status(400).json({ message: 'Invalid room type' });
//     }

//     const reservation = new Reservation({ roomType });
//     await reservation.save();

//     res.json({ message: `Reservation made for ${roomType}` });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error making reservation' });
//   }
// }

async function makeReservation(req, res) {
  const roomType = req.body.roomType;
  try {
    const message = await makeReservationService(roomType);
    // console.log(message, "mess")
    return res.json({ message });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ message: error.message });
  }
}


async function getAvailableRooms(req,res){

    try{
        const hospital = await getAllResourcesFromDB();
        let availableNormal = Math.min(hospital.normalRooms, Math.floor(hospital.normalMasks/2), hospital.flatBeds);
        let availableOxygen = Math.min(hospital.oxygenRooms, Math.floor(hospital.oxygenCylinders/2), hospital.reclinerBeds, Math.floor(hospital.nonRebreatherMasks));
        let availableIcu = Math.min(hospital.icuRooms, hospital.ventilators, hospital.reclinerBeds, hospital.oxygenCylinders);

        res.json({
            availableNormal,
            availableIcu,
            availableOxygen
        })

    }catch(err)
    {
        res.status(500).json({
            message:"Error getting availablity"
        })
    }

}

module.exports = {
  getAllReservations,
  getAllResources,
  makeReservation,
  getAvailableRooms
};