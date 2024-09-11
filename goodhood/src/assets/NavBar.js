import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import GoodHoodLogo from "../GoodHoodLogo.PNG";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () =>
    navigate("/users/login", {state: { from: location.pathname}});
  const handleLogoutClick = () =>
    navigate("/users/logout", {state: { from: location.pathname}});
  const handleBrandClick = () =>
    navigate(cookies.user ? "/users/self" : "/");
  const handleHomeClick = () => 
    navigate("/");

  return (
     <Navbar
        style={{
          margin: "0px",
          justifyContent: "flex-end",
          fontFamily: "DM Sans",
        }}
        expand="lg"
        className="bg-body-tertiary"
      >
      <Container>
        <img src={GoodHoodLogo} width={111} height={75} alt = "Good Hood Logo" onClick={handleHomeClick}/>
          <Navbar.Brand onClick={handleBrandClick}>
            {cookies.user?.username ?? "Good Hood"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/donate">Donate</Nav.Link>
              <Nav.Link href="/volunteer">Volunteer</Nav.Link>

              <NavDropdown title="Resources">
                <NavDropdown.Item href="/about/mission">
                  Our Mission
                </NavDropdown.Item>
                <NavDropdown.Item href="/about/team">
                  Meet the Creators
                </NavDropdown.Item>
                <NavDropdown.Item href="/about/contact">
                  Contact Us
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Posts">
                <NavDropdown.Item href="/posts">
                  Create a Post
                </NavDropdown.Item>
                <NavDropdown.Item href="/search">
                  See Posts
                </NavDropdown.Item>
                {/* TODO is search the same as posts?*/}
              </NavDropdown>

              {cookies.user ? (
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
                  onClick={handleLogoutClick}
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