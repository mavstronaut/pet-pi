const router = require("express").Router();
const soundsController = require("../../controllers/soundsController");
const playController = require("../../controllers/playController");
const audioDefault = require("../../models/hardSoundsSS");

// Landing page call
router.route("/:id")
	.post(soundsController.create);

// Saved page calls
router.route("/saved", function (req, res) {
	res.send(audioDefault);
})

// router.route("/saved")
	  // .get(soundsController.findAllSaved); // commented out to use hard coded sounds

	  
router.route("/delete/:id")
	  .delete(soundsController.remove);
	  
// play the song
 router.route("/saved/:id")
	.post(playController.playSong);
	
// search the song
router.route("/:id")
	.post(playController.searchSong);

// we may need some route for the login api? check passport docs

module.exports = router;
