const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");

const Employee = require("../models/Employee.model");
const Company = require("../models/Company.model");

// Get all the employees from the db
router.get("/", isLoggedIn, (req, res) => {
  Employee.find({})
    .then((allEmployees) => {
      res.json(allEmployees);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

// Get all employees not yet assigned to a company (assigned:false)
router.get("/employeesNotAssigned", isLoggedIn, (req, res) => {
  Employee.find({ assigned: false })
    .then((employeesNotAssigned) => {
      res.json(employeesNotAssigned);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

// Get all the companies with no employees assigned (assigned:false)
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

// Assign employee
router.post("/assign", isLoggedIn, (req, res) => {
  // Get the inputs from the form
  const { employee, company } = req.body;
  // Find the employee and adds the company, changes the status assigned to true.
  Employee.findOneAndUpdate(
    { first_name: employee },
    { company: company, assigned: true },
    { new: true }
  )
    // Find the company and assign the employye, changes the status assigned to true.
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
