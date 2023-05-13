import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Home";

import SearchFlights from "./FlightBookings/searchFlights";
import Cart from "./FlightBookings/cart";
import CheckoutCompleted from "./FlightBookings/checkoutCompleted";
import ViewReservations from "./FlightBookings/viewReservations";

import Search from "./HotelBookings/search";
import Reservation from "./HotelBookings/reservation";
import CheckReservation from "./HotelBookings/CheckReservation";

import Package from "./packages/package";
import Innerpackage from "./packages/innerPackageView";
import CheckoutPackagePage from "./packages/checkoutPackage";
import ThankYouPage from "./packages/thankyou";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Flight Booking */}

        <Route path="flight/search" element={<SearchFlights />} />
        <Route path="flight/cart" element={<Cart />} />
        <Route path="flight/checkout" element={<CheckoutCompleted />} />
        <Route path="flight/reservations" element={<ViewReservations />} />

        {/* Hotel Booking */}
        <Route path="hotel/search" element={<Search />} />
        <Route path="hotel/reservation" element={<Reservation />} />
        <Route path="hotel/CheckReservation" element={<CheckReservation />} />

        {/* Package Booking */}
        <Route path="package/search" element={<Package />} />
        <Route path="package/innerPackageView/:id" element={<Innerpackage />} />
        <Route
          path="package/CheckoutPackagePage/:id"
          element={<CheckoutPackagePage />}
        />
        <Route
          path="package/CheckoutPackagePage/thankyou"
          element={<ThankYouPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
