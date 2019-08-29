const router = require("express").Router();
const soundRoutes = require("./sounds");

// Book routes
router.use("/sounds", soundRoutes);

module.exports = router;
