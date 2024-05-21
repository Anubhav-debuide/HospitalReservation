const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const createHospitalIfNotExists = require("./createHospital")


mongoose.connect(process.env.MONGODB_URI).then(()=> createHospitalIfNotExists(), console.log("Connected to DB")).catch((err)=>console.log(err))

const reservationRoutes = require("./routes/reservation.routes")

app.use("/v1", reservationRoutes)



app.listen(8000, ()=>{
    console.log("Server listening at port 8000")
})

module.exports = app
