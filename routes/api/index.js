const router = require("express").Router();
const bookRoutes = require("./audio");

// Audio routes
router.use("/audio", bookRoutes);

// Owner routes
// router.use("/audio", bookRoutes);

module.exports = router;
