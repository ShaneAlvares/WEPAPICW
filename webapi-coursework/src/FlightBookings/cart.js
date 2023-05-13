import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [allDepartureFlights, setDepartureFlights] = useState([]);
  const [allArrivalFlights, setArrivalFlights] = useState([]);

  const [locattions, setLocattions] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [cabinClasses, setCabinClass] = useState([]);

  const [departureAirport, setDepartureAirport] = useState();
  const [arrivalAirport, setArrivalAirport] = useState();

  const [bookedDepartureSeates, setBookedDepartureSeates] = useState({});
  const [bookedArrivalSeates, setBookedArrivalSeates] = useState({});

  const [mealDeparture, setMealDeparture] = useState();
  const [mealArrival, setMealArrival] = useState();

  const [departureBookedSeats, setDepartureBookedSeats] = useState([]);
  const [arrivalBookedSeats, setArrivalBookedSeats] = useState([]);

  const navigate = useNavigate();

  const meals = [
    { id: 1, name: "Rice" },
    { id: 2, name: "Bread" },
    { id: 3, name: "Milk Rice" },
  ];

  const seats = [
    { id: 1, name: "B 1" },
    { id: 2, name: "M 1" },
    { id: 3, name: "I 1" },
    { id: 4, name: "B 2" },
    { id: 5, name: "M 2" },
    { id: 6, name: "I 2" },
  ];

  const getDepartuteBookedSeats = (id) => {
    axios
      .get("http://localhost:8080/flights/getFlightsBookedSeats/" + id, {})
      .then((response) => {
        if (response.status == 200 && response.data != "No reservations") {
          let seats = response.data.map((item) => item.seatNo);
          setDepartureBookedSeats(seats);
        } else {
          setDepartureBookedSeats([]);
        }
      })
      .catch((error) => {
        // Handle error
        return [];
        console.log(error);
      });
  };

  const getArrivalBookedSeats = (id) => {
    axios
      .get("http://localhost:8080/flights/getFlightsBookedSeats/" + id, {})
      .then((response) => {
        if (response.status == 200 && response.data != "No reservations") {
          let seats = response.data.map((item) => item.seatNo);
          setArrivalBookedSeats(seats);
        } else {
          setArrivalBookedSeats([]);
        }
      })
      .catch((error) => {
        // Handle error
        return [];
        console.log(error);
      });
  };

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cartData"));
    if (cart != null) {
      setCartData(cart);
      setDepartureFlights(cart.departureFlights);
      setArrivalFlights(cart.ArrivalFlights);

      setPrice(
        parseFloat(cart.ArrivalFlights[0].price) +
          parseFloat(cart.departureFlights[0].price)
      );

      setLocattions(cart.locations);
      setAirlines(cart.airlines);
      setCabinClass(cart.classes);

      setDepartureAirport(cart.departurePlace);
      setArrivalAirport(cart.arrivalPlace);

      getDepartuteBookedSeats(cart.departureFlights[0].id);
      getArrivalBookedSeats(cart.ArrivalFlights[0].id);
    }
  }, []);

  const handleDepartureMealSelection = (event) => {
    setMealDeparture(event.target.value);
  };
  const handleArrivalMealSelection = (event) => {
    setMealArrival(event.target.value);
  };

  const handleCheckout = () => {
    if (fullName == "") {
      alert("Please enter the full name");
    } else if (contactNo == "") {
      alert("Please enter a contact number.");
    } else if (!contactNo.match(/^[0-9]+$/)) {
      alert("Please recheck the contact number");
    } else if (contactNo.length != 10) {
      alert("Please recheck the contact number");
    } else if (
      bookedDepartureSeates.seatID == undefined ||
      bookedDepartureSeates.seatID == null
    ) {
      alert("Please select a seat in departure flight");
    } else if (
      bookedArrivalSeates.seatID == undefined ||
      bookedArrivalSeates.seatID == null
    ) {
      alert("Please select a seat in arrival flight");
    } else if (mealDeparture == "" || mealDeparture == null) {
      alert("Please select a meal in departure flight");
    } else if (mealArrival == "" || mealArrival == null) {
      alert("Please select a meal in arrival flight");
    } else {
      let identifier = Math.random();

      let checkoutD = {};
      checkoutD.user = {};
      checkoutD.user.name = fullName;
      checkoutD.user.contactNo = contactNo;
      checkoutD.flightID = allDepartureFlights[0].id;
      checkoutD.flightDetails = allDepartureFlights[0];
      checkoutD.link = identifier;
      checkoutD.seatNo = bookedDepartureSeates.seatID;
      checkoutD.Meal = mealDeparture;

      let checkoutA = {};
      checkoutA.user = {};
      checkoutA.user.name = fullName;
      checkoutA.user.contactNo = contactNo;
      checkoutA.flightID = allArrivalFlights[0].id;
      checkoutA.flightDetails = allArrivalFlights[0];
      checkoutA.link = identifier;
      checkoutA.seatNo = bookedArrivalSeates.seatID;
      checkoutA.Meal = mealArrival;

      let records = {};
      records.departure = checkoutD;
      records.arrival = checkoutA;

      console.log(records.departure);

      axios
        .post("http://localhost:8080/flights/checkout", records)
        .then((response) => {
          if (response.status == 200) {
            // alert("You have reserved the flight booking successfully");
            setCartData(null);
            localStorage.removeItem("cartData");

            navigate("/flight/checkout");
          }
        })
        .catch((error) => {
          // Handle error
          console.log(error);
        });
    }
  };

  const handleDepartureSeatPosition = (event) => {
    const buttons = document.querySelectorAll("button[data-departureflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });

    let seatID = event.target.dataset.seatid;
    let seatName = event.target.dataset.seatname;

    let dSeat = {};
    dSeat.flightID = allDepartureFlights[0].id;
    dSeat.seatID = seatID;
    dSeat.seatName = seatName;

    setBookedDepartureSeates(dSeat);
    event.target.classList.add("activeSelected");
  };

  const handleArrivalSeatPosition = (event) => {
    const buttons = document.querySelectorAll("button[data-arrivalflightid]");
    buttons.forEach((button) => {
      button.classList.remove("activeSelected");
    });

    let seatID = event.target.dataset.seatid;
    let seatName = event.target.dataset.seatname;

    let aSeat = {};
    aSeat.flightID = allArrivalFlights[0].id;
    aSeat.seatID = seatID;
    aSeat.seatName = seatName;

    setBookedArrivalSeates(aSeat);

    event.target.classList.add("activeSelected");
  };

  const [fullName, setFullName] = useState("");
  const [contactNo, setContactno] = useState("");
  const [priceTot, setPrice] = useState("");

  const renderCheckoutForm = () => {
    return (
      <div className="mt-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="inputEmail4">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group ">
            <label htmlFor="inputEmail4">Contact No</label>
            <input
              type="text"
              className="form-control"
              value={contactNo}
              onChange={(e) => setContactno(e.target.value)}
            />
          </div>

          <button
            className="btn btn-dark mt-4 checkoutBtn"
            onClick={handleCheckout}
          >
            CHECKOUT NOW
          </button>
        </div>
      </div>
    );
  };

  const renderDepartureFlight = () => {
    return (
      <div className="row mt-4 flightCartRow">
        <div className="card">
          <div className="card-header" style={{ borderBottom: "black solid" }}>
            <b>FLIGHTS TO DEPARTURE | </b>
            <span className="titleDetails">
              {" "}
              {locattions.map((item) => {
                return item.id == departureAirport ? item.name : "";
              })}{" "}
              ->{" "}
              {locattions.map((item) => {
                return item.id == arrivalAirport ? item.name : "";
              })}
            </span>
          </div>
          <div className="card-body">
            {allDepartureFlights.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flightItem"
                  style={{ border: "black dotted" }}
                >
                  <h5 className="card-title">
                    {item.name}{" "}
                    <span className="titleDetails">(No Transits)</span>
                  </h5>
                  <p className="card-text">
                    Class:{" "}
                    <b>
                      {cabinClasses.map((loc) => {
                        return loc.id === item.class ? loc.name : "";
                      })}
                    </b>{" "}
                    | Departure :{" "}
                    <b>
                      {item.departureDate} {item.time}
                    </b>{" "}
                    | Airline:{" "}
                    <b>
                      {airlines.map((air) => {
                        return air.id === item.airline ? air.name : "";
                      })}
                    </b>{" "}
                    | Fly Time: <b>{item.flyTime}min</b> | Price: $
                    <b>{item.price}</b>
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <div>
                        <b>Seat Selection</b>
                      </div>
                      <br></br>- B (Basic Window) Seat<br></br>- M (Middle) Seat
                      <br></br>- I (Isle) Seat<br></br>
                      <br></br>
                      <div>
                        <b>Meal Selection</b>
                      </div>
                      <select
                        className="mealSelection"
                        onChange={handleDepartureMealSelection}
                      >
                        <option>Select a Meal</option>
                        {meals.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-6">
                      <div className="button-set">
                        {seats.map((item, index) => {
                          return (
                            <button
                              className={
                                departureBookedSeats.includes(
                                  item.id.toString()
                                )
                                  ? "Booked"
                                  : "NotBooked"
                              }
                              data-seatid={item.id}
                              data-seatname={item.name}
                              key={index}
                              data-departureflightid="true"
                              onClick={
                                departureBookedSeats.includes(
                                  item.id.toString()
                                )
                                  ? null
                                  : handleDepartureSeatPosition
                              }
                            >
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                      Seat Selected: <b>{bookedDepartureSeates.seatName}</b>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderArrivalFlight = () => {
    return (
      <div className="row mt-4 mb-4 flightCartRow">
        <div className="card">
          <div className="card-header" style={{ borderBottom: "black solid" }}>
            <b>FLIGHTS TO ARRIVAL | </b>
            <span className="titleDetails">
              {" "}
              {locattions.map((item) => {
                return item.id == arrivalAirport ? item.name : "";
              })}{" "}
              ->{" "}
              {locattions.map((item) => {
                return item.id == departureAirport ? item.name : "";
              })}
            </span>
          </div>
          <div className="card-body">
            {allArrivalFlights.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flightItem"
                  style={{ border: "black dotted" }}
                >
                  <h5 className="card-title">
                    {item.name}{" "}
                    <span className="titleDetails">(No Transits)</span>
                  </h5>
                  <p className="card-text">
                    Class:{" "}
                    <b>
                      {cabinClasses.map((loc) => {
                        return loc.id === item.class ? loc.name : "";
                      })}
                    </b>{" "}
                    | Departure :{" "}
                    <b>
                      {item.departureDate} {item.time}
                    </b>{" "}
                    | Airline:{" "}
                    <b>
                      {airlines.map((air) => {
                        return air.id === item.airline ? air.name : "";
                      })}
                    </b>{" "}
                    | Fly Time: <b>{item.flyTime}min</b> | Price: $
                    <b>{item.price}</b>
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <div>
                        <b>Seat Selection</b>
                      </div>
                      <br></br>- B (Basic Window) Seat<br></br>- M (Middle) Seat
                      <br></br>- I (Isle) Seat<br></br>
                      <br></br>
                      <div>
                        <b>Meal Selection</b>
                      </div>
                      <select
                        className="mealSelection"
                        onChange={handleArrivalMealSelection}
                      >
                        <option>Select a Meal</option>
                        {meals.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-6">
                      <div className="button-set">
                        {seats.map((item, index) => {
                          return (
                            <button
                              className={
                                arrivalBookedSeats.includes(item.id.toString())
                                  ? "Booked"
                                  : "NotBooked"
                              }
                              data-seatid={item.id}
                              data-seatname={item.name}
                              key={index}
                              data-arrivalflightid="true"
                              onClick={handleArrivalSeatPosition}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                      Seat Selected: <b>{bookedArrivalSeates.seatName}</b>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderTotValueDisplaySection = () => {
    return (
      <div className="" style={{ float: "inline-end" }}>
        <table className="cartTotSection">
          <tr>
            <td>SUB TOTAL: </td>
            <td>USD {priceTot}</td>
          </tr>
          <tr>
            <td>TAX AMOUNT: </td>
            <td>USD 200</td>
          </tr>
          <tr>
            <td>
              <b>TOTAL AMOUNT: </b>
            </td>
            <td
              style={{
                borderBottom: "black double 5px",
                borderTop: "black solid 2px",
              }}
            >
              <b>USD {priceTot + 200}</b>
            </td>
          </tr>
        </table>
      </div>
    );
  };

  const viewPage = () => {
    if (cartData != null) {
      return (
        <div>
          <span className="HeaderName">
            <b>HOLIDAY CENTRAL - CART</b>
          </span>
          <span
            className="cartItemIcon"
            onClick={() => navigate("/flight/search")}
          >
            BACK
          </span>
          <br></br>
          <br></br>
          <span
            className="cartItemIcon mb-4"
            onClick={() => {
              setCartData(null);
              localStorage.removeItem("cartData");
            }}
            style={{ background: "red", color: "white" }}
          >
            CLEAR CART
          </span>
          {renderDepartureFlight()}
          {renderArrivalFlight()}
          {renderTotValueDisplaySection()}
          <div className="row">
            <span className="HeaderName mt-4">
              <b>HOLIDAY CENTRAL - CHECKOUT</b>
            </span>
          </div>

          {renderCheckoutForm()}
        </div>
      );
    } else {
      return (
        <div>
          <span className="HeaderName">
            <b>HOLIDAY CENTRAL - CART</b>
          </span>
          <span
            className="cartItemIcon"
            onClick={() => navigate("/flight/search")}
          >
            BACK
          </span>
          <br></br>
          <br></br>
          <span
            className="cartItemIcon mb-4"
            onClick={() => navigate("/flight/search")}
            style={{ background: "red", color: "white" }}
          >
            CLEAR CART
          </span>
          <div className="row mt-4">
            <div className="alert alert-info" role="alert">
              No Any Cart Items
            </div>
          </div>
        </div>
      );
    }
  };

  return <div className="container mt-4">{viewPage()}</div>;
};

export default Cart;
