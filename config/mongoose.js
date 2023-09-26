const mongoose = require("mongoose");

// Connect to the MongoDB database using the provided connection string.
mongoose
  .connect(
    "mongodb+srv://vipuld:nRWYU9WDmzVwUY6A@issuetracker.f0idqjk.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Database :: MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
