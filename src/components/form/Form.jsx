import './form.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const validateFormData = (formData) => {
  const errors = {};

  if (!formData.reservationDate) {
    errors.reservationDate = 'Date is required.';
  }
  if (!formData.vehicleRegistrationNumber) {
    errors.vehicleRegistrationNumber = 'Vehicle Registration Number is required.';
  }
  if (!formData.currentMileage) {
    errors.currentMileage = 'Current Mileage is required.';
  }

  return errors;
};

function Form(props) {
  const { jwtToken, idToken, userDetails , csrfToken} = props;
  const [formData, setFormData] = useState({
    reservationDate: '',
    preferredTime: '10',
    vehicleRegistrationNumber: '',
    preferredLocation: 'Galle',
    currentMileage: '',
    message: '',
  });

  function refreshBrowser() {
    window.location.reload();
  }
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitizedValue,
    }));
  };

  const fetchUserDetails = async () => {
    const email = userDetails.email;
    const name = userDetails.name;
    const number = userDetails.phone_number;

    setFormData({
      ...formData,
      userName: name,
      email: email,
      number: number,
      X_CSRF_TOKEN: csrfToken
    });
  };

  useEffect(() => {
    fetchUserDetails();
  }, [idToken, jwtToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateFormData(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/customer/make-reservation',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
            'XCSRFTOKEN': csrfToken
          },
        }
      );

      if (response.status === 201) {
        window.alert('Reservation success !!');
        setTimeout(() => {
          refreshBrowser();
        }, 500);
      } else if (response.status === 208) {
        window.alert('Reservation already reported !!');
        setTimeout(() => {
          refreshBrowser();
        }, 500);
      } else {
        alert('Reservation failed!');
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="service-reservation-form">
      <h2>Vehicle Service Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reservationDate">Date of Service Reservation:</label>
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            min={getCurrentDate()}
            onChange={handleInputChange}
            value={formData.reservationDate}
            required
          />
          {errors.reservationDate && <span className="error">{errors.reservationDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="preferredTime">Preferred Time:</label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleInputChange}
          >
            <option value="10">10 AM</option>
            <option value="11">11 AM</option>
            <option value="12">12 PM</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="vehicleRegistrationNumber">Vehicle Registration Number:</label>
          <input
            type="text"
            id="vehicleRegistrationNumber"
            name="vehicleRegistrationNumber"
            value={formData.vehicleRegistrationNumber}
            onChange={handleInputChange}
            required
          />
          {errors.vehicleRegistrationNumber && (
            <span className="error">{errors.vehicleRegistrationNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="preferredLocation">Preferred Location:</label>
          <select
            id="preferredLocation"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleInputChange}
          >
            <option value="Colombo">Colombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kalutara">Kalutara</option>
            <option value="Kandy">Kandy</option>
            <option value="Matale">Matale</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Galle">Galle</option>
            <option value="Matara">Matara</option>
            <option value="Hambantota">Hambantota</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Mannar">Mannar</option>
            <option value="Mullaitivu">Mullaitivu</option>
            <option value="Vavuniya">Vavuniya</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Ampara">Ampara</option>
            <option value="Trincomalee">Trincomalee</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Puttalam">Puttalam</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Polonnaruwa">Polonnaruwa</option>
            <option value="Badulla">Badulla</option>
            <option value="Monaragala">Monaragala</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Kegalle">Kegalle</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currentMileage">Current Mileage:</label>
          <input
            type="number"
            id="currentMileage"
            name="currentMileage"
            value={formData.currentMileage}
            onChange={handleInputChange}
            required
          />
          {errors.currentMileage && <span className="error">{errors.currentMileage}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleTextareaChange}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
