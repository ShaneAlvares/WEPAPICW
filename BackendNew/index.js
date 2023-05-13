const express = require("express");
const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://apiwebcw:W4ZPk1AWIGmrR8zZ@holidaycentral.7bwifhs.mongodb.net/HolidayCentral",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

const baseHotelRouts = require("./routs/baseHotelRouts.js");
const basePackageRouts = require("./routs/basePackageRouts.js");
const baseFlightRouts = require("./routs/baseFlightRouts.js");

app.use("/hotels", baseHotelRouts);
app.use("/packages", basePackageRouts);
app.use("/flights", baseFlightRouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(session({ secret: "The Secret!" }));

//app.use(cookieParser());

app.listen(8080);
