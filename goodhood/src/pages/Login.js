import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { gql, useLazyQuery } from "@apollo/client";
import "../Login.css";

const checkUserQuery = gql`
query Query(
        $emailAddress: String!,
        $password: String!
) {
  checkUser(
    emailAddress: $emailAddress
    password: $password
  ) {
    _id
    username
    firstName
    lastName
    userEmail
  }
}
`;

function processUser(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => key !== "__typename")
      .map(([key, value]) => [key.replace(/^_/, ''), value]));
}

function Login() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [checkUser] = useLazyQuery(checkUserQuery)
  const navigate = useNavigate();
  const location = useLocation();

  // if already logged in, go back or return home
  useEffect(() => {
    if (cookies?.user)
      navigate(location.state?.from ?? "/");
  }, [cookies, navigate, location]);

  const handleClick = () => {
    navigate("/users/register");
  };

  const handleLogin = () => {
    // Check if the email is valid.
    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    // Check the password requirements.
    const passwordValidationResult = validatePassword(password);
    if (passwordValidationResult !== "valid") {
      setErrorMessage(passwordValidationResult);
      return;
    }

    checkUser({
      variables: {
        emailAddress: email.trim(),
        password: password.trim(),
      }
    }).then((response) => {
      const user = response.data?.checkUser
      if (!user)
        throw new Error("Bad Credentials.");
      setErrorMessage("");
      setCookie("user",
        processUser(user),
        {path: "/", sameSite: "strict", secure: true});
      navigate("/users/self");
    
    }).catch((error) => {
      setErrorMessage(error.message ?? error.toString());
    });
    
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
    <div class="content-container">
      <div className="Login">
        <div className="box">
          <div>
            <h2>Login</h2>
            <p style={{color: "red"}}>
              {errorMessage}
            </p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Don't have an account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
