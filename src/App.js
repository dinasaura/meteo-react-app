import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import CityDetails from "./components/CityDetails";
import Favorites from "./screens/favorites/Favorites";
import Navbar from "./components/NavBar";
import citiesData from "./components/citiesData/CitiesData";

const App = () => {
  const [cities, setCities] = useState(citiesData);

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
