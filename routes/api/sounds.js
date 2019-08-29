const router = require("express").Router();
const soundsController = require("../../controllers/soundscontroller");
const playController = require("../../controllers/playController");

// Landing page call
router.route("/:id")
	.post(soundsController.create);

// Saved page calls
router.route("/saved")
  	.get(soundsController.findAllSaved);

router.route("/delete/:id")
	  .delete(soundsController.remove);
	  
// play the song
 router.route("/saved")
	.post(playController.playSong);
	

module.exports = router;
