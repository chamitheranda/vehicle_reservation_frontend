// Dashboard.jsx
import React from 'react';
import './dashboard.css';

function Dashboard(props) {
  const {toggleForm , idToken , jwtToken } = props;
  return (
    <div className="dashboard">
      <header className="dashboard-header">Welcome!</header>
      <div className="dashboard-buttons">
        <button className="dashboard-button" onClick={toggleForm}>Make Reservation</button>
        <button className="dashboard-button">View All Reservations</button>
        <button className="dashboard-button">View Future Reservations</button>
      </div>
    </div>
  );
}

export default Dashboard;
