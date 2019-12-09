const mongoose = require('mongoose');

const resto = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
    required: true,

  },
  imgUrl: {
    type: String,
    default: "resto.png"
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  tel:{
    type: String,
    trim: true,
    required: true,

  },
  address: {
    type: String,
    trim: true,
    required: true,

  },
  plat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plat' }],
  reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reservation' }]
});

module.exports = mongoose.model('resto', resto);
