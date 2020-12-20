const express = require('express');
const { RegisterRules, validator } = require('../middleware/validator');
const isAuth = require('../middleware/passport-setup');
const Router = express.Router();
const { register, login } = require('../controllers/user.controller');

Router.post('/register', RegisterRules(), validator, register);
Router.post('/login', login);
Router.get('/current', isAuth(), (req, res) => {

      res.json(req.user);
});

module.exports = Router;