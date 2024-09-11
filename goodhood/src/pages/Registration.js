import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const createUserQuery = gql`
mutation Mutation(
  $username: String!,
  $firstName: String!,
  $lastName: String!,
  $userEmail: String!,
  $password: String!
) {
  createUser(
    username: $username
    firstName: $firstName
    lastName: $lastName
    userEmail: $userEmail
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

function Registration() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [registrationError, setRegistrationError] = useState("");
    const [createUser] = useMutation(createUserQuery);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
  
    const handleRegister = async () => {
      // Check if the email is valid.
      if (!isValidEmail(email)) {
        setRegistrationError("Invalid email address.");
        return;
      }
  
      if (username === "") {
        setRegistrationError("Please enter a username.");
        return;
      }
  
      // Check if the password and password confirmation match.
      if (password !== passwordConfirmation) {
        setRegistrationError("Passwords do not match.");
        return;
      }
  
      // Check the password requirements.
      const passwordValidationResult = validatePassword(password);
      if (passwordValidationResult !== "valid") {
        setRegistrationError(passwordValidationResult);
        return;
      }
      
      createUser({
				variables: {
					username: username,
          userEmail: email,
          password: password,
					firstName: "NA", // TODO ??
					lastName: "NA", // TODO ??
				},
			}).then((response) => {
				const user = response.data?.createUser;
				if (!user)
          throw new Error("Could not register user.");
        setCookie("user",
          processUser(user),
          {path: "/", sameSite: "strict", secure: true});
        navigate("/");
			}).catch((error) => {
        setRegistrationError(error.message);
      });
    };
  
    const validatePassword = (password) => {
      if (password.length < 8) {
        return "Password must contain at least 8 characters.";
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
  
    const navigate = useNavigate();
  
    return (
      <div class="content-container">
      <div className="page">
      <div className="Login">
        <div className="box">
          <h2>Register</h2>
          <p>{registrationError}</p>
          <div>
            <p style={{ textAlign: "left", marginBottom: 5, fontWeight: "bold" }}>
              Email
            </p>
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                boxSizing: "border-box",
              }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p style={{ textAlign: "left", marginBottom: 5, fontWeight: "bold" }}>
              Username
            </p>
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                boxSizing: "border-box",
              }}
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <p style={{ textAlign: "left", marginBottom: 5, fontWeight: "bold" }}>
              Password
            </p>
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
          <div>
            <p style={{ textAlign: "left", marginBottom: 5, fontWeight: "bold" }}>
              Confirm Password
            </p>
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                boxSizing: "border-box",
              }}
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button
            onClick={handleRegister}
            className="register-button"
            style={{ marginTop: "20px" }}
          >
            Register
          </button>
        </div>
      </div>
      </div>
      </div>
    );
  }
  
  export default Registration;