const Hospital = require("../models/hospital.model");

const getAllResourcesFromDB = async()=>{
    const hospital = await Hospital.findOne();
    return hospital;
}
  

module.exports = {
    getAllResourcesFromDB,
}