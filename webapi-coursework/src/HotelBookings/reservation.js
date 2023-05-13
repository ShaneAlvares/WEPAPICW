import React, { useEffect, useState } from "react";
import Axios from "axios";
import Search from "./search";
import { useNavigate } from "react-router-dom";

function Reservation() {
  const navigate = useNavigate();
  const [hotelReference, setHotelReference] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [boardBasis, setBoardBasis] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [pricePerRoom, setPricePerRoom] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [numDays, setnumDays] = useState("");

  const calculateTotalPrice = () => {
    const total =
      parseInt(numRooms) * parseInt(pricePerRoom) * parseInt(numDays);
    setTotalPrice(total);
  };

  const [listOfHotel, setListOfHotel] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchRating, setsearchRating] = useState("");
  const [searchPrice, setsearchPrice] = useState("");
  const [searchPriceRoomBread, setsearchPriceRommBread] = useState("");
  const [searchPriceBreak, setsearchPriceBreak] = useState("");
  const [filteredData, setfilteredDate] = useState(listOfHotel);

  //for facilities
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = listOfHotel.filter(
      (item) =>
        item.facilities.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.facilities.toUpperCase().includes(searchTerm.toUpperCase())
    );
    setfilteredDate(filteredData);
    console.log("result", filteredData);
  };

  //for ratings
  const handleChangeRating = (event) => {
    setsearchRating(event.target.value);
    const filteredData = listOfHotel.filter(
      (item) =>
        // item.starrating.toLowerCase().includes(searchRating.toLowerCase()) ||
        item.starrating
          .toString()
          .toLowerCase()
          .includes(searchRating.toLowerCase()) ||
        item.starrating
          .toString()
          .toUpperCase()
          .includes(searchRating.toString().toUpperCase())
    );
    setfilteredDate(filteredData);
    console.log("result", filteredData);
  };

  //for room price
  const handleChangePrice = (event) => {
    setsearchPrice(event.target.value);
    const filteredData = listOfHotel.filter(
      (item) =>
        item.priceperroom
          .toString()
          .toLowerCase()
          .includes(searchPrice.toLowerCase()) ||
        item.priceperroom
          .toString()
          .toUpperCase()
          .includes(searchPrice.toString().toUpperCase())
    );
    setfilteredDate(filteredData);
    console.log("result", filteredData);
  };

  //for room bread
  const handleChangePriceRoomBread = (event) => {
    setsearchPriceRommBread(event.target.value);
    const filteredData = listOfHotel.filter(
      (item) =>
        item.priceperroombread
          .toString()
          .toLowerCase()
          .includes(searchPriceRoomBread.toLowerCase()) ||
        item.priceperroombread
          .toString()
          .toUpperCase()
          .includes(searchPriceRoomBread.toString().toUpperCase())
    );
    setfilteredDate(filteredData);
    console.log("result", filteredData);
  };

  const handleChangePriceBreak = (event) => {
    setsearchPriceBreak(event.target.value);
    const filteredData = listOfHotel.filter(
      (item) =>
        item.priceperroombreakfast
          .toString()
          .toLowerCase()
          .includes(searchPriceBreak.toLowerCase()) ||
        item.priceperroombreakfast
          .toString()
          .toUpperCase()
          .includes(searchPriceBreak.toString().toUpperCase())
    );
    setfilteredDate(filteredData);
    console.log("result", filteredData);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const destiniValue = queryParams.get("txtdestini");

    if (destiniValue) {
      Axios.get("http://localhost:8080/hotels/reservation", {
        params: {
          txtdestini: destiniValue,
        },
      }).then((response) => {
        setListOfHotel(response.data);
        setfilteredDate(response.data);
        console.log("ss", response.data);
      });
    }
  }, []);

  const checkreservation = (referense) => {
    navigate("/CheckReservation", { state: referense });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); // create a new FormData object from the form element
    const checkoutData = {}; // initialize an empty object to store the form data

    // loop through the form fields and add their values to the checkoutData object
    for (const [name, value] of formData) {
      checkoutData[name] = value;
    }

    console.log("vjrvkout fsts", checkoutData);

    Axios.post("http://localhost:8080/hotels/checkout", { ...checkoutData })
      .then((response) => {
        console.log(response);
        alert("Reservation created successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error creating reservation");
      });
  };

  return (
    <div>
      <center>
        <table>
          <tr>
            <td>
              <label for="">Facilities</label>
            </td>
            <td>
              <input
                type="text"
                id="txtfacilities"
                value={searchTerm}
                onChange={handleChange}
                name="txtfacilities"
              />
            </td>
            <td>
              <label for="">Ratings</label>
            </td>
            <td>
              <input
                type="text"
                id="txtfilrating"
                value={searchRating}
                onChange={handleChangeRating}
                name="txtfilrating"
              />
            </td>
            <td>
              <label for="">Price</label>
            </td>
            <td>
              <input
                type="text"
                id="txtprice"
                value={searchPrice}
                onChange={handleChangePrice}
                name="txtprice"
                placeholder="Full Board"
              />
            </td>
            <td>
              <input
                type="text"
                id="txtbreadprice"
                value={searchPriceRoomBread}
                onChange={handleChangePriceRoomBread}
                name="txtbreadprice"
                placeholder="Bread"
              />
            </td>
            <td>
              <input
                type="text"
                id="txtbreakfastprice"
                value={searchPriceBreak}
                onChange={handleChangePriceBreak}
                name="txtbreakfastprice"
                placeholder="Break Fast"
              />
            </td>
          </tr>
        </table>
      </center>
      <br />

      <div className="App">
        <div className="userDisplay">
          <div>
            <center>
              <table>
                <tr>
                  <th>Hotel Reference No</th>
                  <th>Hotel Name</th>
                  <th>Hotel Location</th>
                  <th>Hotel Contact No</th>
                  <th>Hotel Contact Email</th>
                  <th>Hotel Ratings</th>
                  <th>Hotel Facilities</th>
                  <th>Hotel Room Types</th>
                  <th>Hotel Room Numbers</th>
                  <th>Hotel Full Board</th>
                  <th>Hotel Bread</th>
                  <th>Hotel Breakfast</th>
                  <th>Check Reservations</th>
                </tr>
                {filteredData.map((hotel) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {hotel.hotelreference}
                      </td>
                      <td style={{ textAlign: "center" }}>{hotel.hotelname}</td>
                      <td style={{ textAlign: "center" }}>{hotel.location}</td>
                      <td style={{ textAlign: "center" }}>{hotel.phone}</td>
                      <td style={{ textAlign: "center" }}>{hotel.email}</td>
                      <td style={{ textAlign: "center" }}>
                        {hotel.starrating}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {hotel.facilities}
                      </td>
                      <td style={{ textAlign: "center" }}>{hotel.roomtypes}</td>
                      <td style={{ textAlign: "center" }}>
                        {hotel.roomnumbers}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {hotel.priceperroom}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {hotel.priceperroombread}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {hotel.priceperroombreakfast}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        <button
                          type="submit"
                          onClick={() => checkreservation(hotel.hotelreference)}
                        >
                          Reservation
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
              <h3>Add Reseravation</h3>
              <form action="" method="post" onSubmit={handleSubmit}>
                <table>
                  <tr>
                    <td>
                      <label for="">Hotel Reference No</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="hotelreference"
                        name="hotelreference"
                        value={hotelReference}
                        onChange={(e) => setHotelReference(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="">Hotel Name</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="hotelname"
                        name="hotelname"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="">Customer Name</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="customername"
                        name="customername"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="">Customer Contact</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="cusomercontact"
                        name="cusomercontact"
                        value={customerContact}
                        onChange={(e) => setCustomerContact(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="">Checkin Date</label>
                    </td>
                    <td>
                      <input
                        type="Date"
                        id="checkindate"
                        name="checkindate"
                        value={checkinDate}
                        onChange={(e) => setCheckinDate(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="">Checkout Date</label>
                    </td>
                    <td>
                      <input
                        type="Date"
                        id="checkoutdate"
                        name="checkoutdate"
                        value={checkoutDate}
                        onChange={(e) => setCheckoutDate(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="">Number Of Days</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="numdays"
                        name="numdays"
                        value={numDays}
                        onChange={(e) => setnumDays(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="numRooms">Number of Rooms:</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="numrooms"
                        name="numrooms"
                        value={numRooms}
                        onChange={(e) => setNumRooms(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Board Basis</label>
                    </td>
                    <select
                      name="boardbasis"
                      id="boardbasis"
                      value={boardBasis}
                      onChange={(e) => setBoardBasis(e.target.value)}
                    >
                      <option value="FullBoard">Full Board</option>
                      <option value="Bread">Bread</option>
                      <option value="Breakfast">Break Fast</option>
                    </select>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="pricePerRoom">Price per Room</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        id="priceperroom"
                        name="priceperroom"
                        value={pricePerRoom}
                        onChange={(e) => setPricePerRoom(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Press To Calculate</label>
                    </td>
                    <td colSpan="2">
                      <button type="button" onClick={calculateTotalPrice}>
                        Calculate
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="totalPrice">Total Price:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="totalprice"
                        name="totalprice"
                        value={totalPrice}
                        readOnly
                        onChange={(e) => setTotalPrice(e.target.value)}
                      />
                    </td>
                  </tr>
                </table>
                <br />
                <button type="submit">Add Checkout</button>
              </form>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
