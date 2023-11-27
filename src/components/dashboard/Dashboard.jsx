import React from 'react';
import './dashboard.css';

function Dashboard(props) {
  const { toggleForm, toggleRes, toggleFutureRes, userDetails } = props;
  const name = userDetails.name;
  return (
    <div className="dashboard">
      <p className="dashboard-header">Welcome  {name} !</p>
      <div className="dashboard-buttons">
        <button className="dashboard-button" onClick={toggleForm}>Make Reservation</button>
        <button className="dashboard-button" onClick={toggleRes}>View All Reservations</button>
        <button className="dashboard-button" onClick={toggleFutureRes}>Delete Reservations</button>
      </div>
    </div>
  );
}

export default Dashboard;
