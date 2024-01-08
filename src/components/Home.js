import React from 'react';
import axios from 'axios';
import CityList from './CityList';
import CityDetails from './CityDetails';

const Home = ({ cities, onCityClick, onAddCity }) => {
  const [currentCityDetails, setCurrentCityDetails] = React.useState(null);

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

  return (
    <div>
      <CityList cities={cities} onCityClick={handleCityClick} />
      <button onClick={onAddCity}>Aggiungi Città</button>

      {currentCityDetails && <CityDetails />}
    </div>
  );
};

export default Home;
