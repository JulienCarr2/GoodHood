// components/Organization1.js
import React from 'react';
import { useNavigate } from "react-router-dom";
//import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import organization1Image from './organization1.jpg'; // replace with the actual image path
import './Organization.css'; // create a CSS file for styling\


const Organization1 = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/donate-page-1");
  };

  return (
    <div className="organization-container">
      <img src={organization1Image} alt="Organization 1" className="organization-image" />
      {/* Use Link component to navigate to the donation page */}

      
    </div>
  );
};

export default Organization1;
