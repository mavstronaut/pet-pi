const router = require("express").Router();
const soundsController = require("../../controllers/soundscontroller");

// Landing page call
router.route("/:id")
	.post(soundsController.create);

// Saved page calls
router.route("/saved")
  	.get(soundsController.findAllSaved);

router.route("/delete/:id")
  	.delete(soundsController.remove);

module.exports = router;
