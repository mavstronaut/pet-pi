const router = require("express").Router();
const soundRoutes = require("./sounds");

// adding login es6 syntax
const userRouter = require('./user');


// Sound routes
router.use("/sounds", soundRoutes);

// User routes
// router.use("/login", jwt);
router.use("/user", userRouter);

module.exports = router;
