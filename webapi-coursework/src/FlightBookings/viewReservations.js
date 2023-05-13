import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const ViewReservations = () => {
  const navigate = useNavigate();
  const [allReservations, setReservations] = useState([]);

  const locattions = [
    { id: 1, name: "Canada" },
    { id: 2, name: "Sri Lanka" },
    { id: 3, name: "New Work" },
    { id: 4, name: "Japan" },
    { id: 5, name: "Australlia" },
  ];
  const cabinClasses = [
    { id: 1, name: "Bussiness" },
    { id: 2, name: "Econommy" },
  ];

  const airlines = [
    { id: 1, name: "Sri Lankan" },
    { id: 2, name: "Emmirates" },
  ];

  const seats = [
    { id: 1, name: "B 1" },
    { id: 2, name: "M 1" },
    { id: 3, name: "I 1" },
    { id: 4, name: "B 2" },
    { id: 5, name: "M 2" },
    { id: 6, name: "I 2" },
  ];

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("cartData") == undefined) {
      setCartCount(0);
    } else {
      setCartCount(1);
    }
  }, [cartCount]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/flights/reservations/", {})
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const viewBookings = () => {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Contact No.</th>
            <th scope="col">Flight Name</th>
            <th scope="col">Seat No</th>
            <th scope="col">Price</th>
            <th scope="col">Airline</th>
            <th scope="col">Departure Location</th>
            <th scope="col">Departure Date</th>
            <th scope="col">Class</th>
          </tr>
        </thead>
        <tbody>
          {allReservations.map((item, index) => {
            return (
              <tr>
                <th scope="row">{++index}</th>
                <td>{item.user.name}</td>
                <td>{item.user.contactNo}</td>
                <td>{item.flightDetails.name}</td>
                <td>
                  {seats.map((seat) =>
                    seat.id == item.seatNo ? seat.name : ""
                  )}
                </td>
                <td>USD {item.flightDetails.price}</td>
                <td>
                  {airlines.map((air) =>
                    air.id == item.flightDetails.airline ? air.name : ""
                  )}
                </td>
                <td>
                  {locattions.map((loc) =>
                    loc.id == item.flightDetails.departure ? loc.name : ""
                  )}
                </td>
                <td>{item.flightDetails.departureDate}</td>
                <td>
                  {cabinClasses.map((cls) =>
                    cls.id == item.flightDetails.class ? cls.name : ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      <span className="HeaderName">
        <b>HOLIDAY CENTRAL - FLIGHT SEARCH</b>
      </span>
      <span
        className="cartItemIcon"
        style={{ marginLeft: "10px" }}
        onClick={() => navigate("/flight/cart")}
      >
        CART <span className="cartCount">{cartCount}</span>
      </span>
      <span
        className="cartItemIcon"
        style={{ marginLeft: "10px" }}
        onClick={() => navigate("/flight/reservations")}
      >
        ALL RESERVATION
      </span>
      <span className="cartItemIcon" onClick={() => navigate("/flight/search")}>
        HOME
      </span>
      <br></br>
      <br></br>
      <br></br>
      {viewBookings()}
    </div>
  );
};

export default ViewReservations;
