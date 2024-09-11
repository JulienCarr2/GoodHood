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
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import User from "./pages/User";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import Search from "./pages/Search";

import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./assets/NavBar";
//import Volunteer from './pages/Volunteer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/about/contact" element={<ContactUs />} />
          <Route path="/about/team" element={<AboutUs />} />
          <Route path="/about/mission" element={<OurMission />} />
          
          <Route path="/donate" element={<Donations />} />
          <Route path="/donate/red-cross" element={<DonatePage1 />} />
          <Route path="/donate/ny-blood" element={<DonatePage2 />} />
          <Route path="/donate/toys-for-tots" element={<DonatePage3 />} />
          <Route path="/donate/hoboken-shelter" element={<DonatePage4 />} />
          
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/volunteer/red-cross" element={<VolunteerPage1 />} />
          <Route path="/volunteer/ny-blood" element={<VolunteerPage2 />} />
          <Route path="/volunteer/toys-for-tots" element={<VolunteerPage3 />} />
          <Route path="/volunteer/hoboken-shelter" element={<VolunteerPage4 />} />

          <Route path="/users/register" element={<Registration />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/logout" element={<Logout />} />
          <Route path="/users/self" element={<UserPage />} />
          <Route path="/users/:id" element={<User />} />

          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts" element={<Posts />} />
          
          <Route path="/search" element={<Search />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
