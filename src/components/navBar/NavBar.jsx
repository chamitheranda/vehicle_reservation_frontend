import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

function NavBar(props) {

    const {toggleNav , toggleDash , togglePro} = props;
  return (
    <nav className="navbar">
      <div className="company-name">Vehiclo</div>
      <ul className="nav-list">
        <li className="nav-item">
            <button onClick={toggleNav}>Home</button>
        </li>
        <li className="nav-item">
            <button onClick={toggleDash}>Dashboard</button>
        </li>
        <li className="nav-item">
            <button onClick={togglePro}>Profile</button>
        </li>
        <li className="nav-item">
            <button>Contact</button>
        </li>
</ul>

    </nav>
  );
}

export default NavBar;
