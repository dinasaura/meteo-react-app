// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CityDetails from './components/CityDetails';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [cities, setCities] = useState([
    { id: uuidv4(), name: 'London', details: {  } },
    { id: uuidv4(), name: 'Paris', details: { } },
    { id: uuidv4(), name: 'New York', details: { } },
    { id: uuidv4(), name: 'Tokyo', details: { } },
  ]);

  const handleCityClick = async (cityName) => {
    try {
    } catch (error) {
      console.error(`Errore nella chiamata API per ${cityName}:`, error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home cities={cities} onCityClick={handleCityClick} setCities={setCities}/>}
        />
        <Route path="/details/:cityName" element={<CityDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
