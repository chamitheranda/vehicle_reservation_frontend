// FutureRes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './futureRes.css';
import { format } from 'date-fns';

const FutureRes = (props) => {
  const { jwtToken, idToken, userDetails } = props;
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = userDetails.email;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/api/v1/customer/get-future-reservation', {
        params: {
          email,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setReservations(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('jwt token', jwtToken);
        console.log('user email', email);
        console.error('Error fetching reservation data:', error);
        setIsLoading(false);
      });
  }, [jwtToken, email]);

  const handleDelete = (reservationId) => {
    // Implement the logic to delete a reservation based on its ID
    // You can make another axios request or use your preferred method here
    // After deleting, you can update the state to reflect the changes
  };

  return (
    <div className="reservation-list">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Vehicle No</th>
              <th>Mileage</th>
              <th>Action</th> {/* Add the Action column */}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(reservations) && reservations.length > 0 ? (
              reservations.map((reservation, index) => (
                <tr className="reservation" key={index}>
                  <td>{format(new Date(reservation.date), 'dd-MM-yy')}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.vehicleNo}</td>
                  <td>{reservation.mileage}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No reservations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FutureRes;
