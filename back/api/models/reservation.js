const mongoose = require('mongoose');

const reservation = new mongoose.Schema({
      description: {
        type: String,
        trim: true,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      user : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
      resto : {type: mongoose.Schema.Types.ObjectId, ref: 'resto'},
      plat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plat' }],

    });


module.exports = mongoose.model('reservation', reservation);
