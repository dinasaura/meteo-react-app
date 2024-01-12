import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CityDetails from "./components/CityDetails";
import SearchCity from "./searchCity/SearchCity";
import Favorites from "./favorites/Favorites";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/NavBar";

const App = () => {
  const [cities, setCities] = useState([
    { id: uuidv4(), name: "London", details: {} },
    { id: uuidv4(), name: "Paris", details: {} },
    { id: uuidv4(), name: "New York", details: {} },
    { id: uuidv4(), name: "Tokyo", details: {} },
  ]);

  const [favorites, setFavorites] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleCityClick = async (cityName) => {
    try {
    } catch (error) {
      console.error(`Errore nella chiamata API per ${cityName}:`, error);
    }
  };

  const handleAddToFavorites = (city) => {
    setFavorites((prevFavorites) => [...prevFavorites, city]);
  };
  const handleRemoveFromFavorites = (cityId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((city) => city.id !== cityId)
    );
  };

  useEffect(() => {
    console.log("Città preferite:", favorites);
  }, [favorites]);

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
              onAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchCity cities={cities} setSearchQuery={setSearchQuery} />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onCityClick={handleCityClick}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          }
        />
        <Route
          path="/details/:cityName"
          element={
            <CityDetails
              cities={cities}
              favorites={favorites}
              onAddToFavorites={handleAddToFavorites}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
