var express = require("express");
var app = express();
const db = require("./config/mongoose");
const port = 8000;
const path = require("path");

// Use express-ejs-layouts middleware for templates adn partials
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true })); //This allows to easily access the form data in your route handlers through req.body.name

// Specify the directory for static files
app.use(express.static("assets"));

// Set Scripts of component to layout specific pos
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Set up views engine
app.set("view engine", "ejs");
app.set("views", "./views"); // look for
app.set("views", path.join(__dirname, "views")); // look for

// use express router
app.use("/", require("./routes"));

//Start the app on the prot
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running the server: ${error}`);
  }
  console.log(`Server is running on port: ${port}`);
});
