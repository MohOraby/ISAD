const express = require("express"),
app = express(),
bodyparser = require("body-parser"),
mongoose = require("mongoose"),
methodoverride = require("method-override"),
user = require("./models/user"),
passport = require("passport"),
LocalStrategy = require("passport-local");

var authRoutes = require("./routes/auth"),
    cityRoutes = require("./routes/city");


// mongoose.connect("mongodb://localhost/ISAD");
mongoose.connect("mongodb://Mohamed:mo7amed@ds259499.mlab.com:59499/isad");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.use(require("express-session")({
  secret: "IVSA",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use("/", authRoutes);
app.use("/", cityRoutes);

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(process.env.PORT || 5000, function(){
  console.log("Server is running");
});