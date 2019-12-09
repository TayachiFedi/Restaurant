const mongoose = require("mongoose");
let bcrypt = require("bcrypt-nodejs");

const user = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  // roles: {type: [{type: String,enum: ['admin','user', 'resto']}],default: 'user'}, if user canne be admin and resto or resto and user in s time
  role: {
    type: String,
    enum: ["admin", "user" , "resto"],
    default: "user"
  },
  imgUrl: {
    type: String,
    default: "profil.png"
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: true,
  },
  resto : {type: mongoose.Schema.Types.ObjectId, ref: 'resto'}

});


user.methods.comparePassword = function(candidatePassword, cb) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

user.pre("save", function() {
  console.log(this.password);
  this.password = bcrypt.hashSync(this.password);
  console.log(this.password);
});

module.exports = mongoose.model("user", user);
