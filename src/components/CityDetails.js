import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CityDetails = () => {
  const { cityName } = useParams();
  const [cityDetails, setCityDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Making API request for city:', cityName);
  
    axios.get(`http://localhost:3001/api/weather/${cityName}`)
      .then(response => {
        console.log('API response:', response.data);
  
        const cityData = response.data;
        setCityDetails(cityData);
      })
      .catch(error => {
        console.error('Errore nella chiamata API:', error);
        // Puoi navigare indietro alla lista delle città in caso di errore
        navigate('/');
      });
  
  }, [cityName, navigate]);

  return (
    <div>
      <h2>Dettagli Città</h2>
      {cityDetails ? (
        <>
          <p>Nome: {cityDetails.location.name}</p>
          <p>Regione: {cityDetails.location.region}</p>
          <p>Paese: {cityDetails.location.country}</p>
          <p>Latitudine: {cityDetails.location.lat}</p>
          <p>Longitudine: {cityDetails.location.lon}</p>
          <p>Temperatura: {cityDetails.current.temp_c}°C</p>
          <p>Condizione: {cityDetails.current.condition.text}</p>
          <Link to="/">Torna alla lista</Link>
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};


export default CityDetails;

