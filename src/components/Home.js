import React, { useState } from "react";
import axios from "axios";
import CityList from "./CityList";
import CityDetails from "./CityDetails";
import styles from "./Home.module.css";
import { v4 as uuidv4 } from 'uuid';

const Home = ({ cities, onCityClick, setCities }) => {
  const [currentCityDetails, setCurrentCityDetails] = useState(null);
  const [newCityName, setNewCityName] = useState("");

  const handleCityClick = async (cityName) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/weather/${cityName}`);
      const cityData = response.data;
      setCurrentCityDetails(cityData);
      onCityClick(cityName, cityData);
    } catch (error) {
      console.error(`Errore nella chiamata API per ${cityName}:`, error);
    }
  };

  const handleAddCity = async () => {
    const trimmedCityName = newCityName.trim();
  
    if (trimmedCityName === '') {
      return;
    }
  

    if (cities.some(city => { 
      console.log('datiCityName:', city.name);
      console.log('trimmed:', trimmedCityName);
      return city.name === trimmedCityName
    } )) {
      alert('Questa città esiste già.');
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:3001/api/weather/${trimmedCityName}`);
      const cityData = response.data;

      console.log('dati citta', cityData)
  
      setCities(prevCities => {
        if (prevCities.some(city => city.name === trimmedCityName)) {
          alert('Questa città esiste già.');
          return prevCities;
        }
  
        return [
          ...prevCities,
          { id: uuidv4(), name: trimmedCityName, details: cityData }
        ];
      });
  
      setNewCityName("");
    } catch (error) {
      console.error(`Errore nella chiamata API per ${trimmedCityName}:`, error);
    }
  };
  
 

  return (
    <div className={styles.homeContainer}>
      <CityList cities={cities} onCityClick={handleCityClick} />
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value.toUpperCase())} 
          className={styles.inputField} 
          placeholder="Inserisci il nome della nuova città"
        />
      </div>

      <button className={styles.addButton} onClick={handleAddCity}>
        Aggiungi Città
      </button>

      {currentCityDetails && <CityDetails />}
    </div>
  );
};

export default Home;
