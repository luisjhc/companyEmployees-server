const router = require("express").Router();

// GET home page 👇
// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

const homeRoutes = require("./home");
router.use("/home", homeRoutes);

const authRoutes = require("./auth");
router.use("/auth", authRoutes);

// Protected page 👇
const managerRoutes = require("./manager");
router.use("/manager", managerRoutes);

module.exports = router;
