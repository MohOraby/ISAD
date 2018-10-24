var mongoose = require("mongoose");

const CITIES = ["cairo", "alex", "kfs", "mansoura", "suez", "benisuef", "damanhour", "banha", 'menia', "menoufia"]

const articleSchema = new mongoose.Schema({
  title: String,
  image : String,
  body: String,
  created: {type: Date, default: Date.now},
  city: {type: String, enum: CITIES }
});

module.exports = mongoose.model("article", articleSchema);