
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  ip: {
    type: String
  }

});


var Url = module.exports = mongoose.model('url', urlSchema);;