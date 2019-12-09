const routes = require("express").Router();
const user = require("../models/user");
const resto = require("../models/resto");
let auth = require("./authjwt");
let upload = require('../../uplouad')
// *************************************************************** user todo *****************************************************************************
// *** Add Admin ***

routes.post("/adduser", auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    const addAdmin = await user.create(req.body).catch(err => err);
    res.send({ msg: "successful add", data: addAdmin });
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});

// *** Get Admin All Or One by _iD***
routes.get("/user/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    if (req.params.id === "all") {
      const adminResult = await user.find().exec();
      res.send({ msg: "successful findall", data: adminResult });
    } else {
      const adminResult = await user.findOne({ _id: req.params.id }, {password:0}).exec();
      res.send({
        msg: "successful findone with id" + req.params.id + " :) ",
        data: adminResult
      });
    }
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});

// *** Update Admin by _id ***
routes.post("/update/:id",upload.single('imgUrl'), auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    let userObject = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      email: req.body.email,
    }
    if (req.file) {
      userObject.imgUrl= req.file ? req.file.filename : ''

    }
    if (req.body.password) {
      userObject.password = req.body.password

    }
    const adminResult = await user.updateOne({ _id: req.params.id }, { $set: userObject }).catch(err =>err)
    res.send ({msg: 'ok',data :adminResult})
}
})

// *** remove Admin by _id ***
routes.post("/delete/:id", auth.required, async (req, res, next) => {
  if (req.payload.data.role === "admin") {
    user.findById(req.params.id).exec(function(err, user) {
      if (err) {
        return res.status(500).send({
            code: "500",
            message:
              "There was a problem finding the user with id : " +
              req.params.id +
              " in the database: " +
              err.message
          });
      } else if (user == null) {
        return res
          .status(404)
          .send({
            code: "404",
            message: "No user found with id " + req.params.id + " ."
          });
      }
      user
        .remove()
        .then(function(userDeleted) {
          res
            .status(200)
            .send({
              code: "200",
              message:
                "Suppression d'user " + req.params.id + " et associés réussie."
            });
        })
        .catch(function(err) {
          return res
            .status(500)
            .send({
              code: "500",
              message:
                "There was a problem deleting the user with id " +
                req.params.id +
                " in the database: " +
                err.message
            });
        });
    });
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});
// *************************************************************** end user **************************************************************************


// *** Get Admin All Or One by _iD***
routes.get("/getadmin/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    if (req.params.id === "all") {
      const adminResult = await user.find({role: "admin"}, {password:0}).exec();
      res.send({ msg: "successful findall", data: adminResult });
    } else {
      const adminResult = await user.findOne({ _id: req.params.id }, {password:0}).exec();
      res.send({
        msg: "successful  ",
        data: adminResult
      });
    }
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});
// *** Get simple user All Or One by _iD***
routes.get("/getsimpleuser/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    if (req.params.id === "all") {
      const adminResult = await user.find({role: "user"}, {password:0}).exec();
      res.send({ msg: "successful findall", data: adminResult });
    } else {
      const adminResult = await user.findOne({ _id: req.params.id }, {password:0}).exec();
      res.send({
        msg: "successful  ",
        data: adminResult
      });
    }
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});
// *************************************************************** end user **************************************************************************
// *** Add resto ***

routes.post("/addresto/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    const addresto = await resto.create(req.body).catch(err => err);
    console.log (addresto)
    const updateuser = await user.updateOne(
      { _id: req.params.id },
      { resto: addresto._id }
    );
    res.send({ msg: "successful add", data: updateuser });
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});
// *** Get resto All Or One by _iD***
routes.get("/getresto/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    if (req.params.id === "all") {
      const adminResult = await user.find({role: "resto"}, {password:0}).populate({path:'resto'}).exec();
      res.send({ msg: "successful findall", data: adminResult });
    } else {
      const adminResult = await user.findOne({ _id: req.params.id }, {password:0}).exec();
      res.send({
        msg: "successful  ",
        data: adminResult
      });
    }
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});
// *** Get restooffice All Or One by _iD***
routes.get("/getrestooffice/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "admin") {
    if (req.params.id === "all") {
      const adminResult = await resto.find().exec();
      res.send({ msg: "successful findall", data: adminResult });
    } else {
      const adminResult = await resto.findOne({ _id: req.params.id }).exec();
      res.send({
        msg: "successful  ",
        data: adminResult
      });
    }
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});

module.exports = routes;
