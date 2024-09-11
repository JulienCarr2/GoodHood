// components/Organization1.js
import React from 'react';
import { useNavigate } from "react-router-dom";

import organization2Image from './organization2.png'; // replace with the actual image path
import './Organization.css'; // create a CSS file for styling

const Organization2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/donate-page-2");
  };

  return (
    <div className="organization-container">
      <img src={organization2Image} alt="Organization 1" className="organization-image" />
      {/* Use Link component to navigate to the donation page */}

      <button onClick={handleClick} className="donate-button">New York Blood Center</button>
    </div>
  );
};

export default Organization2;
