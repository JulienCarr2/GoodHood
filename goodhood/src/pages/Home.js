import React from 'react';

const homeContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: 'url(/background.jpg)',  // Not needed here anymore
  backgroundSize: 'cover',
  backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',
  color: '#ffffff', // Set text content to contrast with background
  padding: '0 20px',
  position: 'relative', // Needed for layering
};
const homeHeadingStyle = {
  fontSize: '3em',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
};
const textOverlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set background color with transparency
  padding: '20px',
  borderRadius: '5px', // Add optional rounded corners
  position: 'absolute', // Layer on top of the background
  top: '50%', // Position at vertical center
  left: '50%', // Position at horizontal center
  transform: 'translate(-50%, -50%)', // Offset to compensate for centering
  // Remove filter to keep text sharp
};

const Home = () => {


  return (
    <div style={homeContainerStyle}>
      {/* Background image can be placed here if desired */}
      <img src="/background.jpg" alt="Background Image" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, filter: 'blur(3px)' }} /> {/* Add background image with blur filter */}
      <div style={textOverlayStyle}> {/* Wrap text content in the overlay */}
        <h2 style={{...homeHeadingStyle, animation: 'fadeInOut 5s ease-in-out infinite' }}>Welcome to GoodHood!</h2>
        <p style={{ fontSize: '1.5em', textAlign: 'center' }}>We're dedicated to making positive changes in your community.</p>
      </div>
    </div>
  );
};

export default Home;
