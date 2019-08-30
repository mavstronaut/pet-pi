const router = require("express").Router();
const soundRoutes = require("./sounds");

// Sound routes
router.use("/sounds", soundRoutes);

// User routes
router.use("/login", jwt);

module.exports = router;
