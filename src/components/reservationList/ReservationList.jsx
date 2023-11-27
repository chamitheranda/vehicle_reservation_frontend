import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reservationList.css';
import { format } from 'date-fns'; // Import the date-fns library for date formatting

const ReservationList = (props) => {
  const { jwtToken, idToken, userDetails , csrfToken } = props;
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const email = userDetails.email;

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching data
    axios
      .get('http://localhost:8080/api/v1/customer/get-all-reservation', {
        params: {
          email,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setReservations(response.data.data); // Set reservations state with response.data
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log('jwt token', jwtToken);
        console.log('user email', email);
        console.error('Error fetching reservation data:', error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [jwtToken, email]);

  return (
    <div className="reservation-list">
      {isLoading ? ( // Show loading message while data is being fetched
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Vehicle No</th>
              <th>Mileage</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(reservations) && reservations.length > 0 ? (
              reservations.map((reservation, index) => (
                <tr className="reservation" key={index}>
                  {/* Format the date and time */}
                  <td>{format(new Date(reservation.date), 'dd-MM-yy')}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.vehicleNo}</td>
                  <td>{reservation.mileage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No reservations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationList;
