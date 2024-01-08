import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CityDetails from './components/CityDetails';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [cities, setCities] = React.useState([
    { id: uuidv4(), name: 'London' },
    { id: uuidv4(), name: 'Paris' },
    { id: uuidv4(), name: 'New York' },
    { id: uuidv4(), name: 'Tokyo' },
  ]);

  const handleCityClick = (cityName, cityDetails) => {
    setCities(prevCities =>
      prevCities.map(city =>
        city.name === cityName ? { ...city, details: cityDetails } : city
      )
    );
  };

  const handleAddCity = async () => {
    const newCityName = prompt('Inserisci il nome della nuova città:');
    if (newCityName) {
      try {
        const response = await axios.get(`http://localhost:3001/api/weather/${newCityName}`);
        const cityData = response.data;
        const newCity = { id: uuidv4(), name: newCityName, details: cityData };
        setCities(prevCities => [...prevCities, newCity]);
      } catch (error) {
        console.error(`Errore nella chiamata API per ${newCityName}:`, error);
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home cities={cities} onCityClick={handleCityClick} onAddCity={handleAddCity} />}
        />
        <Route path="/details/:cityName" element={<CityDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
