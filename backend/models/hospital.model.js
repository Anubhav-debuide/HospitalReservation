const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  normalRooms: { type: Number, default: 50},
  oxygenRooms: { type: Number, default: 50 },
  icuRooms: { type: Number, default: 20 },
  flatBeds: { type: Number, default: 80 },
  reclinerBeds: { type: Number, default: 100 },
  ventilators: { type: Number, default: 16 },
  oxygenCylinders: { type: Number, default: 110 },
  normalMasks: { type: Number, default: 200 },
  nonRebreatherMasks: { type: Number, default: 120 }
});


const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital