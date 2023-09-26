const router = require("../routes");

module.exports.home = function (req, res) {
  // res.send("hello world");
  res.render('home');
};
