import React from 'react';

const ContactUs = () => {
  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    height: '100vh',
    background: '#c395e6', // Lavender background color
    
  };

  const headingStyles = {
    fontSize: '60px', // Increased heading size for impact
    fontWeight: 'bold',
    color: '#5f506b', // White text for better contrast
    textShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', // Add subtle text shadow
    marginBottom: '20px',
  };

  const subheadingStyles = {
    fontSize: '22px', // Increased subheading size
    color: 'gray', // Lighter color for readability
    marginBottom: '40px',
  };

  const contactFormStyles = {
    width: '500px', // Fixed width for form
    padding: '40px', // Increased padding for more space
    borderRadius: '10px', // Rounded corners for form
    border: '1px solid #000', // Solid black border with 1px thickness
    borderColor: 'gray',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  };
  

  const inputStyles = {
    width: '100%',
    padding: '15px 20px', // Increased padding for better look
    marginBottom: '15px',
    border: '1px solid #ddd', // Lighter border color
    borderRadius: '5px', // Rounded corners for inputs
    

  };

  const submitButtonStyles = {
    padding: '15px 30px', // Increased padding for better look
    backgroundColor: '#7955b3', // Darker lavender button color
    color: '#fff', // White text for button
    border: 'none', // Remove border from button
    borderRadius: '3px', // Rounded corners for button
    cursor: 'pointer',
  };

  const [name, setName] = React.useState(''); // State variable for name
  const [email, setEmail] = React.useState(''); // State variable for email
  const [message, setMessage] = React.useState(''); // State variable for message
  const [errors, setErrors] = React.useState({}); // State variable for errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        setErrors({ ...errors, name: value.trim() === '' ? 'This field is required' : '' });
        break;
      case 'email':
        setEmail(value);
        setErrors({ ...errors, email: value.trim() === '' || !value.includes('@') ? 'Please enter a valid email address' : '' });
        break;
      case 'message':
        setMessage(value);
        setErrors({ ...errors, message: value.trim() === '' ? 'This field is required' : '' });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    let hasError = false;
    setErrors({}); // Clear any previous errors

    const newErrors = {};
    if (name.trim() === '') {
      newErrors.name = 'This field is required';
      hasError = true;
    }

    if (email.trim() === '' || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (message.trim() === '') {
      newErrors.message = 'This field is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Form validation successful, submit the form here (e.g., using fetch API)
      alert('Form submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div class="content-container">
    <div style={pageStyles}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}> {/* White box for content */}
        <h1 style={headingStyles}>Contact Us</h1>
        <p style={subheadingStyles}>We'd love to hear from you!</p>
        <form style={contactFormStyles} onSubmit={handleSubmit}>
          {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}
          <input
            type="text"
            placeholder="Your Name"
            style={inputStyles}
            value={name}
            onChange={handleChange}
            name="name"
          />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
          <input
            type="email"
            placeholder="Your Email"
            style={inputStyles}
            value={email}
            onChange={handleChange}
            name="email"
          />
          {errors.message && <p style={{ color: 'red', fontSize: '12px' }}>{errors.message}</p>}
          <textarea
            rows="4"
            placeholder="Your Message"
            style={inputStyles}
            value={message}
            onChange={handleChange}
            name="message"
          />
          <button style={submitButtonStyles}  // Removed disabled prop
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
