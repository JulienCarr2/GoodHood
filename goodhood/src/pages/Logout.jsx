import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../Login.css";

function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const location = useLocation();

  // if not already logged in, go back or return home
  useEffect(() => {
    if (!cookies?.user)
      navigate(location.state?.from ?? "/");
  }, [cookies, navigate, location]);

  const handleLogout = () => {
    removeCookie("user", {path: "/", sameSite: "strict", secure: true});
    navigate("/");
  }

  return (
    <div class="content-container">
      <div className="Login">
        <div className="box">
          <div>
            <h2>Logout?</h2>
            <div>
              <button onClick={handleLogout} className="login-button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
