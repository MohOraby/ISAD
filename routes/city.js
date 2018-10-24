var express = require("express");
var router = express.Router();
var article = require("../models/article");

router.get("/:city(cairo|alex|mansoura|kfs|suez|benisuef|damanhour|banha|menia|menoufia)", function(req, res) {
  var city = req.params.city
  article.find({city: req.params.city.toString() }, function(err, articles) {
    if(err) {
      console.log("error");
    } else {
      res.render("city", {articles: articles, city: city});
    }
  });
});

router.post("/:city(cairo|alex|mansoura|kfs|suez|benisuef|damanhour|banha|menia|menoufia)", isLoggedIn, function(req, res){
  article.create(req.body.article, function(err, newArticle){
    if(err){
      console.log(err)
      res.redirect("/new");
    } else {
      res.redirect("/" + req.user.username);
    }
  });
});

router.get("/:city/:id", function(req, res){
  article.findById(req.params.id, function(err, foundArticle){
    if(err) {
      res.redirect("/" + req.params.city);
    } else {
      if(req.params.city === foundArticle.city) {
        res.render("show", {article: foundArticle});
      } else {
        res.redirect("/");
      }
    }
  });
});

router.get("/:city/:id/edit", checkOwner, function(req, res){
  article.findById(req.params.id, function(err, foundArticle){
    if(err){
      res.redirect("/" + req.user.username);
    } else {
      if(req.params.city === foundArticle.city) {
        res.render("edit", {article: foundArticle});
      } else {
        res.redirect("/");
      }
    }
  });
});

router.put("/:city/:id", checkOwner, function(req, res){
  article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedArticle){
    if(err) {
      res.redirect("/" + req.user.username);
    } else {
      res.redirect("/" + req.user.username);
    }
  });
});

router.delete("/:city/:id", checkOwner, function(req, res){
  article.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      res.redirect("/" + req.user.username);
    } else {
      res.redirect("/" + req.user.username);
    }
  });
});

function checkOwner(req, res, next) {
  if(req.isAuthenticated()) {
    article.findById(req.params.id, function(err, foundArticle){
      if(req.user.username === foundArticle.city) {
        next();
      } else {
        res.redirect("back");
      }
    });
  }
}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;