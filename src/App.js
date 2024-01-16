import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import CityDetails from "./screens/CityDetails/CityDetails";
import Favorites from "./screens/Favorites/Favorites";
import Navbar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/details/:cityName" element={<CityDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
