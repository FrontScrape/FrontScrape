var express = require('express');
var db = require('../models');
var router = express.Router();
var authController = require('./authcontroller.js');
var passport = require("passport");

//user authentication 


router.get("/new-user", authController.signup);

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/user',
    failureRedirect: '/'
}));


router.post('/new-user', passport.authenticate('local-signup', {
    successRedirect: '/quiz',
    failureRedirect: '/new-user'
}));


router.get("/logout", function(req, res){
     req.flash("error", "You are logged out.");
    req.session.destroy(function(err){
        res.redirect("/");
    });

})


module.exports = router;