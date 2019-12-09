const mongoose = require('mongoose');

const plat = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
      },
      description: {
        type: String,
        trim: true,
        required: true,
      },
      price:{
        type: String,
        trim: true,
        required: true,
      },
      resto : {type: mongoose.Schema.Types.ObjectId, ref: 'resto'}
    });

module.exports = mongoose.model('plat', plat);