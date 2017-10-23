const mongoose = require('mongoose');

//set up food bank schema
const foodbankSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  website: String
});

module.exports = mongoose.model('Foodbank',foodbankSchema);
