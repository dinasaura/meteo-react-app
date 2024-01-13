import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import CityDetails from "./components/CityDetails";
import SearchCity from "./searchCity/SearchCity";
import Favorites from "./screens/favorites/Favorites";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/NavBar";

const App = () => {
  const [cities, setCities] = useState([
    { id: uuidv4(), name: "London", details: {} },
    { id: uuidv4(), name: "Paris", details: {} },
    { id: uuidv4(), name: "New York", details: {} },
    { id: uuidv4(), name: "Tokyo", details: {} },
  ]);

  const handleCityClick = async (cityName) => {
    try {
    } catch (error) {
      console.error(`Errore nella chiamata API per ${cityName}:`, error);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cities={cities}
              onCityClick={handleCityClick}
              setCities={setCities}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchCity cities={cities} />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              onCityClick={handleCityClick}
            />
          }
        />
        <Route
          path="/details/:cityName"
          element={
            <CityDetails
              cities={cities}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
