const router = require("express").Router();

// GET home page 👇
// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

// Manager page 👇
const homeRoutes = require("./home");
router.use("/home", homeRoutes);

// Auth page 👇
const authRoutes = require("./auth");
router.use("/auth", authRoutes);

// Manager page 👇
const managerRoutes = require("./manager");
router.use("/manager", managerRoutes);

// Employees page 👇
const employeesRoutes = require("./employees");
router.use("/employees", employeesRoutes);

module.exports = router;
