const Hospital = require("../models/hospital.model");

class HospitalService {

    async getAllResourcesFromDB() {
        const hospital = await Hospital.findOne();
        return hospital;
    }

    async upDateResources (hospitalID, updateData) {
        const updatedResoures = await Hospital.findByIdAndUpdate(hospitalID, updateData, {new:true})
        return updatedResoures;
    }
}


module.exports = new HospitalService();