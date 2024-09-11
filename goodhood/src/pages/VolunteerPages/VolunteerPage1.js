// DonatePage1.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import organization1Image from '../../Organizations/organization1.jpg'; // replace with the actual image path
import '../../Organizations/Organization.css'; // Import your CSS file


const DonatePage1 = ({ match }) => {
  const [customAmount, setCustomAmount] = useState('');
  const navigate = useNavigate();


  const handleBackButtonClick = () => {
    navigate("/volunteer");
  };

  const handleVolunteer = (amount) => {
    // Handle the donation logic based on the selected amount
    window.location.href = "https://www.redcross.org/volunteer/become-a-volunteer.html#step1";
    // Add your donation logic here
  };


  return (
    <div className="donate-page-container">
      <img src={organization1Image} alt="Organization 1" className="centered-image with-margin" />
      <h2 className="centered-text">Volunteer at the Red Cross</h2>
      <div className="donation-buttons">
        <button onClick={handleBackButtonClick} className="back-button">Back</button>
        <button onClick={() => handleVolunteer() }>Volunteer Now!</button>
      </div>
      {/* Add donation form and logic here */}
    </div>
  );
};



export default DonatePage1;
