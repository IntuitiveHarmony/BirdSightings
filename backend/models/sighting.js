const mongoose = require('mongoose');

const sighting = new mongoose.Schema({
  bird: String,
  location: String,
  image: String,
})

const Sighting = mongoose.model('Sighting', sighting)

module.exports = Sighting
