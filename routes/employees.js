const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");

const Employee = require("../models/Employee.model");
const Company = require("../models/Company.model");

router.get("/", isLoggedIn, (req, res) => {
  Employee.find({})
    .then((allEmployees) => {
      res.json(allEmployees);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

router.get("/employeesNotAssigned", isLoggedIn, (req, res) => {
  Employee.find({ assigned: false })
    .then((employeesNotAssigned) => {
      res.json(employeesNotAssigned);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

router.get("/companiesWithNoEmployees", isLoggedIn, (req, res) => {
  Company.find({ assigned: false })
    .then((companiesWithNoEmployees) => {
      // console.log("companiesWithNoEmployees:", companiesWithNoEmployees);
      res.json(companiesWithNoEmployees);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

router.post("/assign", isLoggedIn, (req, res) => {
  const { employee, company } = req.body;
  // console.log(req.body);
  Employee.findOneAndUpdate(
    { first_name: employee },
    { company: company, assigned: true },
    { new: true }
  )
    .then((found) => {
      // console.log(found);
      Company.findOneAndUpdate(
        { business_name: company },
        { employee: employee, assigned: true },
        { new: true }
      ).then((found) => {
        // console.log(found);
        res.json({ message: "employee successfully assigned" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
