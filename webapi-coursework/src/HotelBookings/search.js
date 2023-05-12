import React from "react";
import { useState } from "react";

const Search = () =>{

    return (
        <center>
        <h2>Reservation Search</h2>
        <form action="/hotel/reservation" method="get">
            <table>
                <tr>
                    <td><label for="">Destination</label></td>
                    <td><input type="text" id="txtdestini" name="txtdestini" required/></td>
                </tr>
            </table>
            <button type="submit">Search</button>

        </form>
    </center>
  )};

  export default Search;