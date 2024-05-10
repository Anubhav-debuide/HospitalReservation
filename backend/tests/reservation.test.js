
  const request = require("supertest");
  const app = require("../index");
  const mongoose = require("mongoose");


describe("API testing ", ()=>{

  // beforeEach(async()=>{
  //   await mongoose.connect(process.env.MONGODB_URI)
  // })

  // afterEach(async()=>{
  //   await mongoose.connection.close();
  // })
  it("Read all the resources", async()=>{
    const data  = {
      normalRooms: 49,
      oxygenRooms: 50,
      icuRooms: 19,
      flatBeds: 79,
      reclinerBeds: 99,
      ventilators: 15,
      oxygenCylinders: 109,
      normalMasks: 198,
      nonRebreatherMasks: 120,
    }
    const result = await request(app).get("/v1/getAllResources");
    // console.log(result);
    expect(result.status).toBe(200);
    // expect(result.body.length).toBeGreaterThan(0)
    // expect(result.body).toBe(data);
  })

  it("Get all reservations", async()=>{
    const result = await request(app).get("/v1/getAllReservations");
    expect(result.status).toEqual(200);
    // expect(result.body).toBe(Array);
    expect(result.body).toEqual(expect.any(Array));
  })

  it("Make reservations", async()=>{
    const result = await request(app).post("/v1/makeReservation").send({
      "roomType":"Oxygen Room"
  });
    expect(result.status).toEqual(200);
    // expect(result.body).toBe(Array);
    // expect(result.body).toEqual(expect.any(Array));
  })

  it("Shows error message if invalid data is passed in the post request", async()=>{
    const result = await request(app).post("/v1/makeReservation").send({"roomType":"ICB"});
    expect(result.status).toEqual(400);
    expect(result.body.message).toBe("Invalid room type")
  })

})

const {getAllReservationFromDB, getAllResourcesFromDB} = require("../services/reservation.service")
const service  = require("../services/reservation.service")
const { getAllReservations,
  getAllResources,
  makeReservation,
  getAvailableRooms}  = require("../controllers/reservation.controller")

 

describe("Controller tests", ()=>{

  beforeEach(async()=>{
     await  mongoose.connect(process.env.MONGODB_URI)
    
  })

  jest.mock("../services/reservation.service"); 
  afterEach(() => {
    jest.restoreAllMocks(); 
    mongoose.connection.close();
  });



  it("should get all reservations", async () => {
    const req = { };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const result =  await getAllReservations(req, res);
    console.log(result, "result")
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it("should get all resources", async () => {
    const req = { };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getAllResources(req, res);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it("should make a reservation", async () => {
    const req = { body: { roomType: 'Normal Room' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await makeReservation(req, res);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it("should get available rooms", async () => {
    const req = { };
    // const res = { json: jest.fn() };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getAvailableRooms(req, res);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

})





// Test code


//   const mockReservations =[
//     {
//         "_id": "663c6fbda93b984780b58b85",
//         "roomType": "Normal Room",
//         "reservedAt": "2024-05-09T06:39:57.034Z",
//         "__v": 0
//     },
//     {
//         "_id": "663c6ffea93b984780b58b8e",
//         "roomType": "ICU",
//         "reservedAt": "2024-05-09T06:41:02.266Z",
//         "__v": 0
//     },
//     {
//         "_id": "663dba21fb3fae1e1be8b949",
//         "roomType": "Oxygen Room",
//         "reservedAt": "2024-05-10T06:09:37.550Z",
//         "__v": 0
//     },
//     {
//         "_id": "663dbf2c971547894146004c",
//         "roomType": "Oxygen Room",
//         "reservedAt": "2024-05-10T06:31:08.617Z",
//         "__v": 0
//     },
//     {
//         "_id": "663dbfa451ac758ae4052789",
//         "roomType": "Oxygen Room",
//         "reservedAt": "2024-05-10T06:33:08.601Z",
//         "__v": 0
//     }
// ]


  // const obj = {
  //   "roomType":"ICU"
  // }

  // it("should return all the reservations", async () => {

  //   const mockResponse = { json: jest.fn() };

  //   const spyFunction = jest.spyOn(service, "getAllReservationFromDB").mockResolvedValue(mockReservations);
  //   console.log(spyFunction,"spuFun");

  //   const result = await getAllReservations(null, mockResponse);

  //   expect(result.body).toEqual(mockReservations);
  //   expect(mockResponse.json).toHaveBeenCalledWith(mockReservations);
  // });