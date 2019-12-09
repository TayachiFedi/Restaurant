const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const plat = require("../models/plat");
const resto = require("../models/resto");

let auth = require("./authjwt");

// *************************************************************** resto todo *****************************************************************************
// *** Add plat ***

routes.post("/addplat", auth.required, async (req, res) => {
  if (req.payload.data.role === "resto") {
    const addplat = await plat.create(req.body).catch(err => err);
    const updateplat = await resto.updateOne(
      { _id: req.payload.data.resto },
      { plat: addplat._id }
    );
    res.send({ msg: "successful add", data: updateplat });
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not resto to do that" });
  }
});

// *************************************************************** end user **************************************************************************

module.exports = routes;
