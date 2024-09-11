// components/Organization1.js
import React from 'react';
import { useNavigate } from "react-router-dom";

import organization4Image from './organization4.jpg'; // replace with the actual image path
import './Organization.css'; // create a CSS file for styling

const Organization4 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/donate-page-4");
  };

  return (
    <div className="organization-container">
      <img src={organization4Image} alt="Organization 1" className="organization-image" />
      {/* Use Link component to navigate to the donation page */}

      <button onClick={handleClick} className="donate-button">The Hoboken Shelter</button>
    </div>
  );
};

export default Organization4;
