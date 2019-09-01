//require db 
// import db from ("../models")
const db = require("../models")

// passport imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userService = require('./userService');
require('dotenv').config();


module.exports = {
    signup: async (req, res) => {
        try {
            const { value, error } = userService.validateSchema(req.body);
            if (error) {
              return res.status(400).send(error);
            }
            const user = new User();
            user.local.email = value.email;
      
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(value.password, salt);
            user.local.password = hash;
            await user.save();
            return res.json({ success: true, message: 'Signup Successful' });
          } catch (err) {
            console.error(err);
            return res.status(500).send(err);
          }
    },
    login: async(req, res) => {
        try {
            const { error, value } = userService.validateSchema(req.body);
            if (error) {
              return res.status(400).send(error);
            }
            const user = await User.findOne({ 'local.email': value.email });
            if (!user) {
              return res.status(401).json({ err: 'Unauthorized' });
            }
            const matched = bcrypt.compareSync(value.password, user.local.password);
            if (!matched) {
              return res.status(400).json({ err: 'Bad credentials' });
            }
            const token = jwt.sign({ id: user._id }, SECRET, {
              expiresIn: '1d'
            });
            return res.json({ success: true, token });
          } catch (err) {
            console.error(err);
            return res.status(500).send(err);
          }
    },
    authenticate: async (req, res) => {
        console.log(req.isAuthenticated());
        return res.json(req.user);
    },
    authSuccess: async (req, res) => {
         //send JWT token
        console.log(req.isAuthenticated());
        return res.json(req.user);
        return res.redirect('/');
    }
    
};
