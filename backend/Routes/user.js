const express = require('express');
const { RegisterRules, validator } = require('../middleware/validator');
const isAuth = require('../middleware/passport-setup');
const Router = express.Router();
const { register, login,googleLogin,facebookLogin} = require('../controllers/user.controller');

Router.post('/register', RegisterRules(), validator, register);
Router.post('/login', login);
// login with google
Router.post('/authgoogle', googleLogin);

Router.post('/authfacebook', facebookLogin);
Router.get('/current', isAuth(), (req, res) => {

      res.json(req.user);
});

module.exports = Router;