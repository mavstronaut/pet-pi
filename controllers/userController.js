//require db 
// import db from ("../models")
const db = require("../models")

module.exports = {
    findAllSaved: (req, res) => {
        db.SavedSounds
        .find()
        .then(function(result){
            res.json(result)
        })
        .catch(err => res.status(422).json(err));
    },

    create: (req, res) => {
             db.SavedSounds
        .create({
            title: req.body.title,
            link: req.body.link,
            type: req.body.type, // is the type part of the req.body.type? it will come from the form
            key: req.body.key
        })
        .then(res.end())
    },
    remove: (req, res) => {
        db.SavedSounds
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}