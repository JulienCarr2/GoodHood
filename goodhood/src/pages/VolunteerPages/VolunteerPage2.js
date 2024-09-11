// DonatePage2.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import organization2Image from '../../Organizations/organization2.jpg'; // replace with the actual image path
import '../../Organizations/Organization.css'; // Import your CSS file


const DonatePage2 = ({ match }) => {
  const [customAmount, setCustomAmount] = useState('');
  const navigate = useNavigate();


  const handleBackButtonClick = () => {
    navigate("/volunteer");
  };

  const handleVolunteer = () => {
    // Handle the donation logic based on the selected amount
    window.location.href = "https://www.nybc.org/support-us/volunteer/";
    // Add your donation logic here
  };

  /*const handleOtherDonation = () => {
    // Convert the customAmount to a number and check if it's a valid number
    const customAmountNumber = parseFloat(customAmount);
    if (!isNaN(customAmountNumber) && customAmountNumber > 0) {
      handleDonation(customAmountNumber);
    } else {
      // Handle invalid input, you can show an error message or take appropriate action
      console.error('Invalid custom donation amount');
    }
  };
*/
  return (
    <div className="donate-page-container">
      <img src={organization2Image} alt="Organization 1" className="centered-image with-margin" />
      <h2 className="centered-text">Volunteer at the New York Blood Center </h2>
      <div className="donation-buttons">
      <button onClick={handleBackButtonClick} className="back-button">Back</button>
        <button onClick={() => handleVolunteer() }>Volunteer Now!</button>

      </div>
      {/* Add donation form and logic here */}
    </div>
  );
};



export default DonatePage2;
