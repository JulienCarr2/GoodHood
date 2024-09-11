import React from 'react';

const OurMission = () => {
  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '100vh',
    backgroundColor: `#c395e6`, // Assuming you have a background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', // Prevent tiling for a cleaner look
  };

  const headingStyles = {
    fontSize: '48px', // Increase heading size for impact
    fontWeight: 'bold',
    color: '#fff', // White text for better contrast with potential background
    textShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', // Add subtle text shadow
    marginBottom: '20px',
  };

  const memberStyles = {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // Adjust shadow for a cooler look
    borderRadius: '10px',
    maxWidth: '800px',
    position: 'relative',
  };

  return (
    <div class="content-container">
    <div style={pageStyles}>
      <div> {/* Text container */}
        <p style={{ opacity: 0.7, fontSize: '16px', color: '#fff' }}></p>  
        <h1 style={headingStyles}>Making The Hood, Good</h1>
        <p style={memberStyles}>
          Good Hood was created due to the ongoing war in Ukraine. Our original goal was to create a platform where people could provide relief to those who truly needed it. Good Hood has since transformed into a one-stop shop webpage where people can both donate and set up donation pages. Good Hood is designed to help donors find the optimal way to donate their money and help those who truly need it.
        </p>
        <p style={memberStyles}>
          <h3>Your Donations Make a Difference</h3>
          In addition to our trading and marketplace features, we actively seek support through donations to make a positive impact on the lives of those in need. Your contributions go towards initiatives that benefit people in need, promoting education, healthcare, and community development. Join us in our mission to unite communities and the world. Together, we can build a stronger, more connected community that thrives in solidarity. Your participation, whether through trading, connecting, or donating, plays a crucial role in making a difference. Thank you for being a part of our journey. - Good Hood
        </p>
      </div>
    </div>
    </div>
  );
};

export default OurMission;
