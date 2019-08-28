const router = require("express").Router();
const audioRoutes = require("./audio");

// Audio routes
router.use("/audio", audioRoutes);

// Owner routes
// router.use("/audio", audioRoutes);

module.exports = router;
const router = require("express").Router();
const audioRoutes = require("./audio");

// Book routes
router.use("/audio", audioRoutes);

module.exports = router;
