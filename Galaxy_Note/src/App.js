// import logo from './logo.svg';
// import './App.css';

import Profile from "./Component/Profile";
import Reg from "./Component/Sample/Reg";
// import Profile from "./Component/Sample/Profile";
// import Star from "./Component/Sample/Star";
import AccountSettings from "./Component/AccountSetting";

import Star from "./Component/Star";
import Gallery from "./Component/Gallery/Gallery";
import PhotoUpload from "./Component/Gallery/PhotoUpload";
import UniNotes from "./Component/UniNotes";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import StarCont from "./Component/Sample/StarCont";

import Home from "./Bloom/Home";
import Web from "./Bloom/Web";
import ParallaxTimeline from "./Bloom/ParallaxTimeline";
import { ParallaxProvider } from "react-scroll-parallax";
import Galaxy from "./Component/Galaxy";

function App() {
  return (
    <>
   
    {/* <UniNotes/> */}
    {/* <AccountSettings/> */}
    {/* <Star/> */}
    {/* <Profile/> */}
    {/* <Reg/> */}
    {/* <Gallery/> */}
    {/* <PhotoUpload/> */}
    {/* <StarCont/> */}
    {/* <Router>
      <Routes>
        <Route path="/star" element={<Star />} />
        <Route path="/profile" element={<Profile />} />

        {/* Other routes */}
      {/* </Routes>
    </Router> */} 
    {/* Bloom Scroll */}
    {/* <Home /> */}
    {/* <Web/>  */}
     
     

     {/* <ParallaxTimeline/> */}

<Galaxy/>
    </>
  );
}

export default App;
