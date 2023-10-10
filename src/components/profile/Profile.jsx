import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import './profile.css'; 

function Profile(props) {
  const { userDetails } = props;
  const name = userDetails.name;
  const email = userDetails.email;
  const contactNumber = userDetails.phone_number;
  const country = userDetails.address.country;

  const UserDetails = [
    { icon: faUser, text: name },
    { icon: faEnvelope, text: email },
    { icon: faPhone, text: contactNumber },
    { icon: faGlobe, text: country },
  ];

  return (
    <div className="user-details">
      {UserDetails.map((detail, index) => (
        <div key={index} className="detail">
          <FontAwesomeIcon icon={detail.icon} />
          <span>{detail.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Profile;
