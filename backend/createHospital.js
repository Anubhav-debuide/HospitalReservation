const { Hospital } = require('./models/hospital.model');

async function createHospitalIfNotExists() {
  const hospital = await Hospital.findOne();
  if (!hospital) {
    const newHospital = new Hospital({
      normalRooms: 50,
      oxygenRooms: 50,
      icuRooms: 20,
      flatBeds: 80,
      reclinerBeds: 100,
      ventilators: 16,
      oxygenCylinders: 110,
      normalMasks: 200,
      nonRebreatherMasks: 120
    });
    await newHospital.save();
    console.log('Hospital created');
  } else {
    console.log('Hospital already exists');
  }
}
module.exports = createHospitalIfNotExists;