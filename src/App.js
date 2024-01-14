import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import CityDetails from "./components/CityDetails";
import Favorites from "./favorites/Favorites";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/NavBar";

const App = () => {
  const [cities, setCities] = useState([
    { id: uuidv4(), name: "London", country: 'United Kingdom', details: {} },
    { id: uuidv4(), name: "Paris", country: 'France', details: {} },
    { id: uuidv4(), name: "New York", country: 'United States of America', details: {} },
    { id: uuidv4(), name: "Tokyo", country: 'Japan', details: {} },
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
