import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home';

import SearchFlights from './FlightBookings/searchFlights';
import Cart from './FlightBookings/cart';

import Search from './HotelBookings/search';
import Reservation from './HotelBookings/reservation';
import CheckReservation from './HotelBookings/CheckReservation';

import Package from './packages/package';
import Innerpackage from './packages/innerPackageView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        {/* Flight Booking */}
          
          <Route path="flight/search" element={<SearchFlights />} />
          <Route path="flight/cart" element={<Cart />} />

        {/* Hotel Booking */}
          <Route path="hotel/search" element={<Search />} />
          <Route path="hotel/reservation" element={<Reservation />} />
          <Route path="hotel/CheckReservation" element={<CheckReservation />} />

        {/* Package Booking */}
          <Route path="package/search" element={<Package />} />
          <Route path="package/innerPackageView/:id" element={<Innerpackage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;