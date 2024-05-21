const {getAllResourcesFromDB} = require("../services/Hospital.service")
const {getAllReservationFromDB, makeReservationService} = require("../services/reservation.service")
const Hospital = require("../models/hospital.model");
const Reservation = require("../models/Reservation.model")
describe("Service Layer Tests", ()=>{

    afterEach(() => {
        jest.clearAllMocks();
      });


    jest.mock("../services/Hospital.service.js");
    jest.mock("../services/reservation.service.js");

    it("getAllResourcesFromDB Function returns all the resources from Database",async()=>{


        const mockData = {
            "normalRooms": 49,
            "oxygenRooms": 50,
            "icuRooms": 19,
            "flatBeds": 79,
            "reclinerBeds": 99,
            "ventilators": 15,
            "oxygenCylinders": 109,
            "normalMasks": 198,
            "nonRebreatherMasks": 120,
        }

        jest.spyOn(Hospital, "findOne").mockResolvedValue(Promise.resolve(mockData));

        const response = await getAllResourcesFromDB();

        console.log(response,"response");

        expect(Hospital.findOne).toHaveBeenCalledTimes(1);
        expect(response).toEqual(mockData)
    })

   

    it("getAllReservationFromDB function should return an array of reservations", async()=>{

        const mockReservations = [{
            "roomType": "Normal Room"
        },
        {
            "roomType": "ICU"
        }]

        jest.spyOn(Reservation, "find").mockResolvedValue(Promise.resolve(mockReservations));

        const response = await getAllReservationFromDB();

        console.log(response, "reservations from DB");

        expect(Reservation.find).toHaveBeenCalledTimes(1);
        expect(response).toEqual(expect.any(Array));
        expect(response).toEqual(mockReservations);
    })


    
})