var express = require('express');
var router = express.Router();
var User = require('../models/User');
var userService = require('../services/userService');
var userController = require('../controllers/userController');


module.exports = function (passport) {
    router.post('/signup', userController.user_create_post);

    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/'
    }), function (req, res) {
        res.send('hey')
    });
    return router;
};