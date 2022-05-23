const router = require("express").Router();
const axios = require("axios").default;
const isLoggedIn = require("../middleware/isLoggedIn");
const Employee = require("../models/Employee.model");
const Company = require("../models/Company.model");

router.post("/", isLoggedIn, (req, res) => {
  // GETTING THE INPUTS FROM THE FORM 👇
  const { number } = req.body;
  // Save the url with the number selected in a variable
  const employeeRequest = axios.get(
    `https://random-data-api.com/api/users/random_user?size=${number}`
  );
  const companyRequest = axios.get(
    `https://random-data-api.com/api/company/random_company?size=${number}`
  );

  // Make both request employees and companies, at the same time
  axios
    .all([employeeRequest, companyRequest])
    .then(
      axios.spread((employees, companies) => {
        // First delete completely the db and then insert all the employees and companies coming from the api
        Employee.deleteMany({}).then(() => {
          Employee.insertMany(employees.data);
        });
        Company.deleteMany({}).then(() => {
          Company.insertMany(companies.data);
        });

        return res.json({
          message:
            "Companies and Employees have been successfuly loaded to the database.",
        });
      })
    )
    .catch((err) => {
      console.log("err:", err);
    });

  //     // If we wanted to check if the employee already exists in the database before adding it. This way we can keep the data that is already in the db
  //     // const newemployees = employees.map((employee) => {
  //     //   // Employee.findOne({ email: employee.email })
  //     //   Employee.findOne({ email: employee.email })
  //     //     .then((found) => {
  //     //       if (!found) {
  //     //         Employee.create(employee).then(() => {
  //     //           console.log("ADDED STUFF");
  //     //         });
  //     //       }
  //     //       if (found) {
  //     //         console.log("found this employee:", found);
  //     //       }
  //     //     })
});

module.exports = router;
