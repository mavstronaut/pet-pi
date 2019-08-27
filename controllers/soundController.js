//require db 
// import db from ("../models")
const db = require("../models")

module.exports = {
    findAllSaved: (req, res) => {
        db.SavedAudio
        .find()
        .then(function(result){
            res.json(result)
        })
        .catch(err => res.status(422).json(err));
    },

    create: (req, res) => {
        db.SavedAudio
        .create({
            title: req.body.title,
            link: req.body.link,
            key: req.body.key
        })
        .then(res.end())
        .catch(err => res.status(500).json(err)); // added promise catch
    },
    remove: (req, res) => {
        db.SavedAudio
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}