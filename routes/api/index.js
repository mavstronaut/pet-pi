const router = require("express").Router();
const bookRoutes = require("./sounds");

// Book routes
router.use("/sounds", bookRoutes);

module.exports = router;
