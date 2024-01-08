import React, { useState } from 'react';
import axios from 'axios';
import { apiKey } from '../constants';

function SearchCity() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);


  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Errore nella richiesta API:', error.message);
    }
  };

  return (
    <div>
      <h1>App Meteo</h1>
      <label>
        Inserisci il nome della città:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <button onClick={getWeatherData}>Dati meteo</button>
      {weatherData && (
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>Temperatura: {weatherData.current.temp_c}°C</p>
          <p>Condizioni: {weatherData.current.condition.text}</p>
          <p>Condizioni:  <img src={weatherData.current.condition.icon} alt="Condizioni" /></p>
        </div>
      )}
    </div>
  );
}

export default SearchCity; 
