import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from 'react-router-dom';

function CheckReservation() {

    const [listofReservation, setListofReservation] = useState([]);
    const [filteredData, setfilteredDate] = useState(listofReservation);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCheckout, setsearchCheckout] = useState("");




    const location = useLocation();
    const reference = location.state;

    const handleChange = event => {
        setSearchTerm(event.target.value);
        setsearchCheckout(event.target.value);
        const filteredData = listofReservation.filter(item =>
            item.checkindate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.checkindate.toUpperCase().includes(searchTerm.toUpperCase()) ||
            item.checkoutdate.toUpperCase().includes(searchCheckout.toUpperCase()) ||
            item.checkoutdate.toLowerCase().includes(searchCheckout.toLowerCase()) 


        );
        setfilteredDate(filteredData);
        console.log("result", filteredData)
    };

    
    const handleChangecheckout = event => {
      
        setsearchCheckout(event.target.value);
        const filteredData = listofReservation.filter(item =>
            item.checkoutdate.toUpperCase().includes(searchCheckout.toUpperCase()) ||
            item.checkoutdate.toLowerCase().includes(searchCheckout.toLowerCase()) 


        );
        setfilteredDate(filteredData);
        console.log("result", filteredData)
    };




    useEffect(() => {

        if (reference) {
            Axios.get("http://localhost:8080/hotels/getReservations", {
                params:
                {
                    hotelreference: reference,
                }
            }).then((response) => {
                setListofReservation(response.data)
                setfilteredDate(response.data)
                console.log("ss", response.data)
            })
        }
    }, [])

    return (
        <div>
            <center>
                <table>
                    <tr>
                        <td><label for="">ChecIn Date: </label></td>
                        <td><input type="text" id="txtchecindate" value={searchTerm} onChange={handleChange} name="txtchecindate" /></td>
                        <td><label for="">CheckOut Date: </label></td>
                        <td><input type="text" id="txtcheckoutdate" value={searchCheckout} onChange={handleChangecheckout} name="txtcheckoutdate" /></td>
                    </tr>
                </table>
            </center>
            <br />

            <table>
                                <tr>
                                    <th>Hotel Reference No</th>
                                    <th>Hotel Name</th>
                                    <th>Customer Name</th>
                                    <th>Customer Contact</th>
                                    <th>Checkin Date</th>
                                    <th>Checkout Date</th>
                                    <th>Number Of Days</th>
                                    <th>Number Of rooms</th>
                                    <th>Board Basis</th>
                                    <th>Price per Room</th>
                                    <th>Total Price</th>

                                </tr>
                                {filteredData.map((hotel) => {
                                    return (
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>{hotel.hotelreference}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.hotelname}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.customername}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.cusomercontact}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.checkindate}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.checkoutdate}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.numdays}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.numrooms}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.boardbasis}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.priceperroom}</td>
                                            <td style={{ textAlign: 'center' }}>{hotel.totalprice}</td>
                                        </tr>
                                    )
                                })}
                            </table>
        </div>
    )
}
export default CheckReservation;