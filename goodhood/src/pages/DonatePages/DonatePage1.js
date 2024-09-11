// DonatePage1.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import organization1Image from '../../Organizations/organization1.jpg'; // replace with the actual image path
import '../../Organizations/Organization.css'; // Import your CSS file


const DonatePage1 = ({ match }) => {
  const [customAmount, setCustomAmount] = useState('');
  const navigate = useNavigate();


  const handleBackButtonClick = () => {
    navigate("/donations");
  };

  const handleDonation = (amount) => {
    // Handle the donation logic based on the selected amount
    console.log(`Donating $${amount}`);
    // Add your donation logic here
  };

  const handleOtherDonation = () => {
    // Convert the customAmount to a number and check if it's a valid number
    const customAmountNumber = parseFloat(customAmount);
    if (!isNaN(customAmountNumber) && customAmountNumber > 0) {
      handleDonation(customAmountNumber);
    } else {
      // Handle invalid input, you can show an error message or take appropriate action
      console.error('Invalid custom donation amount');
    }
  };

  return (
    <div className="donate-page-container">

      <img src={organization1Image} alt="Organization 1" className="centered-image with-margin" />
      <h2 className="centered-text">Donate To Red Cross</h2>
      <div className="donation-buttons">
      <button onClick={handleBackButtonClick} className="back-button">Back</button>
        <button onClick={() => handleDonation(25)}>Donate $25</button>
        <button onClick={() => handleDonation(50)}>Donate $50</button>
        <button onClick={() => handleDonation(75)}>Donate $75</button>
        <button onClick={() => handleDonation(100)}>Donate $100</button>
        <div>
          <input
            type="text"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
          />
          <button onClick={handleOtherDonation}>Other</button>
        </div>
      </div>
      {/* Add donation form and logic here */}
    </div>
  );
};



export default DonatePage1;
