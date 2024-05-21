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


async function makeReservation(req, res) {
  const roomType = req.body.roomType;
  try {
    const message = await makeReservationService(roomType);
    return res.json({ message });
  } catch (error) {
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