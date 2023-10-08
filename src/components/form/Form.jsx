import './form.css'
import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '@asgardeo/auth-react'; // Import Asgardeo authentication components


function Form(props) {
  const { jwtToken , idToken } = props;
  const [formData, setFormData] = useState({
    reservationDate: '',
    preferredTime: '10',
    vehicleRegistrationNumber: '',
    preferredLocation: 'Galle',
    currentMileage: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

const fetchUserDetails = async () => {
  try {
    const response = await axios.get('https://api.asgardeo.io/t/orgueejs/oauth2/userinfo', {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Replace with your actual access token
      },
    });

    const userDetails = response.data;
    const email = userDetails.email;
    const name = userDetails.name;
    const number = userDetails.phone_number;
    

    console.log('User Details:', userDetails);

    if (userDetails) {
      console.log('data = ',userDetails.email)
      setFormData({
        ...formData,
        userName: name,
        email : email ,
        number : number,
      });
    } else {
      console.warn('Mobile property not found in user details');
    }
  }catch(error) {
    console.error('Error fetching user details:', error);
    console.log('Response Data:', error.response.data);
  }
};

useEffect(() => {
    fetchUserDetails();
}, [idToken, jwtToken]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/customer/make-reservation',
        {
          ...formData 
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  /////////////////////////////


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
            required
          />
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
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;