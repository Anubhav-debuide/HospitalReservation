const express = require("express");
const router = express.Router();


const controller = require("../controllers/reservation.controller")

router.get("/getAllReservations", controller.getAllReservations);
router.get("/getAllResources", controller.getAllResources);
router.get("/getAvailableRooms", controller.getAvailableRooms)
router.post("/makeReservation", controller.makeReservation)

module.exports = router;