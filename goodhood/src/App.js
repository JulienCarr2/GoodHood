import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Registration from "./pages/Registration";
import ContactUs from "./pages/ContactUs";
import OurMission from "./pages/OurMission";
import Donations from "./pages/Donations";
import Volunteer from "./pages/Volunteer";
import UserPage from "./pages/UserPage";
import Posts from "./pages/Posts";
import DonatePage1 from "./pages/DonatePages/DonatePage1";
import DonatePage2 from "./pages/DonatePages/DonatePage2";
import DonatePage3 from "./pages/DonatePages/DonatePage3";
import DonatePage4 from "./pages/DonatePages/DonatePage4";
import VolunteerPage1 from "./pages/VolunteerPages/VolunteerPage1";
import VolunteerPage2 from "./pages/VolunteerPages/VolunteerPage2";
import VolunteerPage3 from "./pages/VolunteerPages/VolunteerPage3";
import VolunteerPage4 from "./pages/VolunteerPages/VolunteerPage4";
import Login from "./Login";







import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
//import Volunteer from './pages/Volunteer';



function App() {

    return (
      <BrowserRouter>
        <NavBar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/OurMission" element={<OurMission />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Volunteer" element={<Volunteer />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/donate-page-1" element={<DonatePage1 />} />
        <Route path="/donate-page-2" element={<DonatePage2 />} />
        <Route path="/donate-page-3" element={<DonatePage3 />} />
        <Route path="/donate-page-4" element={<DonatePage4 />} />
        <Route path="/volunteer-page-1" element={<VolunteerPage1 />} />
        <Route path="/volunteer-page-2" element={<VolunteerPage2 />} />
        <Route path="/volunteer-page-3" element={<VolunteerPage3 />} />
        <Route path="/volunteer-page-4" element={<VolunteerPage4 />} />


      </Routes>
      </BrowserRouter>
    );
}

export default App;
