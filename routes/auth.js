var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  user.register(new user({username: req.body.username}), req.body.password, function(err, user){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    });
  });
});

router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}) ,function(req,res){
});

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

router.get("/new", function(req, res) {
  if(req.isAuthenticated()) {
    res.render("new", {user: req.user});
  } else {
    res.redirect("/");
  }
});

module.exports = router;