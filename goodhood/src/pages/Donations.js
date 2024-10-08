import React from 'react';
import { useNavigate } from "react-router-dom";
import organization1Image from '../Organizations/organization1.jpg'; 
import organization2Image from '../Organizations/organization2.png'; 
import organization3Image from '../Organizations/organization3.png'; 
import organization4Image from '../Organizations/organization4.jpg'; 

const Donations = () => {
  const navigate = useNavigate();

  const handleClick = (urlName) => {
    navigate(`/donate/${urlName}`);
  };

  const pageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#c395e6', // Lavender background color

  };

  const organizationWrapperStyles = {
    margin: '10px',
    width: '200px', // Adjusted width for the organization wrapper
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const organizationImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  };

  const buttonStyles = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '0 0 8px 8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    height: '90px', // Fixed height for all buttons
    lineHeight: '30px', // Centering text vertically
  };

  const organizations = [
    { image: organization1Image, name: "American Red Cross", urlName: "red-cross" },
    { image: organization2Image, name: "New York Blood Center", urlName: "ny-blood" },
    { image: organization3Image, name: "Toys For Tots", urlName: "toys-for-tots" },
    { image: organization4Image, name: "The Hoboken Shelter", urlName: "hoboken-shelter"},
  ];

  return (
    <div class="content-container">
    <div style={pageStyles}>
      <h1>Choose an Organization to Donate to</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {organizations.map((org, index) => (
          <div key={index} style={organizationWrapperStyles}>
            <img src={org.image} alt={org.name} style={organizationImageStyles} />
            <button onClick={() => handleClick(org.urlName)} style={buttonStyles}>{org.name}</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Donations;
