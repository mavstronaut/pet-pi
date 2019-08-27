const router = require("express").Router();
const soundController = require("../../controllers/soundController");

// Landing page call
router.route("/:id")
	.post(soundController.create);

// Saved page calls
router.route("/saved")
  	.get(soundController.findAllSaved);

router.route("/delete/:id")
  	.delete(soundController.remove);

module.exports = router;
