import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import GoodHoodLogo from "./GoodHoodLogo.PNG";


import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";


const NavBar = () => {

  const [isAuth] = useState(localStorage.getItem("isAuth"));
  const [webName, setWebName] = useState(localStorage.getItem("webName"));

  const handleLoginClick = () => {
    window.location.pathname = "/login";
  };

  const handleHomeClick = () => {
    //if (isAuth) {
    //  window.location.pathname = "/timeline";
    //} else {
      window.location.pathname = "/";
    }
    const handlePostClick = () => {
      window.location.pathname = "/Posts";
  };





  return (
    
     <Navbar
        style={{
          margin: "5px",
          justifyContent: "flex-end",
          fontFamily: "DM Sans",
        }}
        expand="lg"
        className="bg-body-tertiary"
      >
      <Container>
        <img src={GoodHoodLogo} width={111} height={75} alt = "Good Hood Logo" onClick={handleHomeClick}/>
          <Navbar.Brand onClick={handleHomeClick}>
            {isAuth ? webName : "Good Hood"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
              <NavDropdown title="How to Help">
                <NavDropdown.Item href="/Donations">
                  Donate
                </NavDropdown.Item>
                <NavDropdown.Item href="/Volunteer">
                 Volunteer
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Resources">
                <NavDropdown.Item href="/ourmission">
                  Our Mission
                </NavDropdown.Item>
                <NavDropdown.Item href="/AboutUs">
                  Meet the Creators
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handlePostClick}>Posts</Nav.Link>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
              {isAuth ? (
                <Button
                  style={{
                    display: "inline-block",
                    padding: "10px 10spx",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "none",
                    fontFamily: "DM Sans, sans-serif",
                    borderRadius: "25px",
                    backgroundColor: "#434DA1",
                    color: "#ffffff",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    marginRight: "10px",
                  }}
                  
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  style={{
                    display: "inline-block",
                    padding: "10px 10spx",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "none",
                    fontFamily: "DM Sans, sans-serif",
                    borderRadius: "25px",
                    backgroundColor: "#434DA1",
                    color: "#ffffff",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    marginRight: "10px",
                  }}
                  onClick={handleLoginClick}
                >
                  Get Started
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    

  );
};

export default NavBar;