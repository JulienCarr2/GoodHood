import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file for styling

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [loginText, setLoginText] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    //navigate("/Regristration");
    window.location.pathname = "/Registration";
  };

  const handleLogin = () => {
    // Check if the email is valid.
    if (!isValidEmail(username)) {
      setLoginText("Invalid email address.");
      return;
    }

    // Check the password requirements.
    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== "valid") {
      setLoginText(passwordValidationResult);
      return;
    }

    // If both email and password are valid, navigate to '/User'
    //navigate("/UserPage");
    window.location.pathname = "/UserPage";
  };

  const pageStyles = {
    textAlign: "center",
    padding: "20px",
    backgroundSize: "500px 500px",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    height: "100vh",
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain a special character (!@#$%^&*).";
    }
    return "valid";
  };
  

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className="pageStyles">
      <div className="Login">
        <div className="box">
          <div>
            <h2>Login</h2>
            <p>{loginText}</p>
            <div>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  boxSizing: "border-box",
                }}
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  boxSizing: "border-box",
                }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br></br>
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
            <button onClick={handleClick} className="register-button">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
