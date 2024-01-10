import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CityDetails.module.css";

const CityDetails = () => {
  const { cityName } = useParams();
  const [details, setDetails] = useState(null);
  const [threeDayForecast, setThreeDayForecast] = useState(null);
  const [showThreeDayForecast, setShowThreeDayForecast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/weather/${cityName}`
        );

        console.log('Dati API:', response.data);
        const cityData = response.data;
        setDetails(cityData);

        // previsioni tre giorni
        const forecastResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=14a83ea940ef4d45b5b103446240401&q=${cityName}&days=3&aqi=no&alerts=yes`
        );
        const forecastData = forecastResponse.data;
        setThreeDayForecast(
          forecastData.forecast && forecastData.forecast.forecastday
        );
      } catch (error) {
        console.error("Errore nella chiamata API:", error);
        navigate("/");
      }
    };

    fetchData();
  }, [cityName, navigate]);

  const toggleThreeDayForecast = () => {
    setShowThreeDayForecast(!showThreeDayForecast);
  };

  const renderThreeDayForecast = () => {
    if (!threeDayForecast) {
      return null;
    }

    return (
      <div className={styles.threeDayForecast}>
        <h3>Previsioni a tre giorni</h3>
        {threeDayForecast.map((day) => (
          <div key={day.date} className={styles.threeDayForecastContainer}>
            <p>{day.date}</p>
            <p>Massima: {day.day.maxtemp_c}°C</p>
            <p>Minima: {day.day.mintemp_c}°C</p>
            <img src={day.day.condition.icon} alt="Weather" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.cityDetailsContainer}>
      {details ? (
        <>
          <h2>
            {details.location.name}, {details.location.country}
          </h2>
          <p>Regione: {details.location.region}</p>
          <div className={styles.weatherIconContainer}>
              <img src={details.current.condition.icon} alt="Weather" />
            </div>
          <div className={styles.detailsContainer}>
            <div className={styles.weatherDetails}>
              <p>Temperatura: {details.current.temp_c}°C</p>
              <p>Condizione: {details.current.condition.text}</p>
              <p>Latitudine: {details.location.lat}</p>
              <p>Longitudine: {details.location.lon}</p>
            </div>

            <div className={styles.weatherDetails}>
              <p>Pressione: {details.current.pressure_mb} mb</p>
              <p>Umidità: {details.current.humidity}%</p>
              <p>Velocità del vento: {details.current.wind_kph} km/h</p>
              <p>Direzione del vento: {details.current.wind_dir}</p>
            </div>
          </div>
          <p className={styles.missingData}>
               Ora dell'ultima osservazione: {details.current.last_updated || 'Dato non disponibile'}
              </p>
          {showThreeDayForecast && renderThreeDayForecast()}
          <button
            className={styles.showMoreButton}
            onClick={toggleThreeDayForecast}
          >
            {showThreeDayForecast ? "Mostra di meno" : "Mostra di più"}
          </button>
          <Link to="/" className={styles.returnLink}>
            Torna alla lista
          </Link>
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default CityDetails;
