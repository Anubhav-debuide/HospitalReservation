
  const request = require("supertest");
  const app = require("../index");
  const mongoose = require("mongoose");


describe("API testing ", ()=>{

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
    expect(result.status).toBe(200);
  })

  it("Get all reservations", async()=>{
    const result = await request(app).get("/v1/getAllReservations");
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(expect.any(Array));
  })

  it("Make reservations", async()=>{
    const result = await request(app).post("/v1/makeReservation").send({
      "roomType":"Oxygen Room"
  });
    expect(result.status).toEqual(200);
  })

  it("Shows error message if invalid data is passed in the post request", async()=>{
    const result = await request(app).post("/v1/makeReservation").send({"roomType":"ICB"});
    expect(result.status).toEqual(400);
    expect(result.body.message).toBe("Invalid room type")
  })

})

const {getAllReservationFromDB} = require("../services/reservation.service")
const {getAllResourcesFromDB} = require("../services/Hospital.service")
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
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getAvailableRooms(req, res);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

})

