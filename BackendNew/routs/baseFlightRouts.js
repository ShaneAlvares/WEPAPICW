var express = require("express");
// const app = express();
var router = express.Router();
// var path = require('path');
// const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// // mongoose.connect('mongodb+srv://apiwebcw:W4ZPk1AWIGmrR8zZ@holidaycentral.7bwifhs.mongodb.net/HolidayCentral', { useNewUrlParser: true, useUnifiedTopology: true });
// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', function() {
// //   console.log('Connected to the database');
// // });

const flightSchema = {
  id: Number,
  name: String,
  departure: Number,
  arrival: Number,
  price: String,
  departureDate: String,
  time: String,
  flyTime: String,
  airline: Number,
  class: Number,
  status: Number,
};

const flightreservationsSechema = {
  user: {
    name: String,
    contactNo: String,
  },
  flightID: String,
  flightDetails: {
    // Assuming allArrivalFlights[0] contains details about the flight
  },
  link: String,
  seatNo: String,
  Meal: String,
};

const Flight = mongoose.model("flights", flightSchema);
const FlightReservations = mongoose.model(
  "flightreservations",
  flightreservationsSechema
);

router.post("/getFlights", async function (req, res) {
  console.log(req.body);

  let depatureFindObj = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    departureDate: req.body.departureDate,
  };
  let arrivalFindObj = {
    departure: req.body.arrival,
    arrival: req.body.departure,
    departureDate: req.body.arrivalDate,
  };

  if (req.body.class) {
    depatureFindObj.class = req.body.class;
    arrivalFindObj.class = req.body.class;
  }
  if (req.body.airline) {
    depatureFindObj.airline = req.body.airline;
    arrivalFindObj.airline = req.body.airline;
  }

  try {
    let results = {};

    let flighsToDeparture = await Flight.find(depatureFindObj);
    // console.log("flighs To Departure");
    // console.log(flighsToDeparture);

    let flighsToArriveAgain = await Flight.find(arrivalFindObj);
    // console.log("flighs To Arrive");
    // console.log(flighsToArriveAgain);

    if (flighsToDeparture.length == 0 || flighsToArriveAgain.length == 0) {
      res.send("No any round trips available for the selected combinations");
    } else {
      results.flighsToDeparture = flighsToDeparture;
      results.flighsToArriveAgain = flighsToArriveAgain;
      res.send(results);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/checkout", async function (req, res) {
  try {
    console.log(req.body.departure);

    req.body.departure.date = new Date();
    req.body.arrival.date = new Date();

    let pushDeparture = await FlightReservations.create(req.body.departure);
    let pushArrival = await FlightReservations.create(req.body.arrival);

    res.status(200).json(req.body);

    console.log("Done");
  } catch (err) {
    console.log(err);
  }
});

router.get("/getFlightsBookedSeats/:id", async function (req, res) {
  try {
    let flightID = {
      flightID: req.params.id,
    };
    let seatsBooked = await FlightReservations.find(flightID);

    if (seatsBooked.length == 0) {
      res.send("No reservations");
    } else {
      res.send(seatsBooked);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/reservations", async function (req, res) {
  try {
    let reservations = await FlightReservations.find({});

    if (reservations.length == 0) {
      res.send("No reservations");
    } else {
      res.send(reservations);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
