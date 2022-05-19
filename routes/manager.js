const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");

const Company = require("../models/Company.model");

router.get("/", isLoggedIn, (req, res) => {
  Company.find({})
    .then((allCompanies) => {
      res.json(allCompanies);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

module.exports = router;
