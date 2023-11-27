import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content" >
        <div className="footer-logo">
          <h2>Vehiclo</h2>
          <p>Vehiclo is your trusted company for making vehicle service reservations. Our mission is to provide convenient and efficient service scheduling for your vehicles.</p>
        </div>
        <div className="footer-contact" >
          <h3>Contact Us</h3>
          <p>Email: contact@vehiclo.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vehiclo</p>
      </div>
    </footer>
  );
};

export default Footer;
