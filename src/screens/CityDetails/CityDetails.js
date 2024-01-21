import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CityDetails.module.css";
import useFavoritesCities from "../../hooks/useFavoritesCities";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import it from "date-fns/locale/it";
import { apiKey } from "../../constants";

const CityDetails = () => {
  const { cityName } = useParams();
  const [details, setDetails] = useState(null);
  const [sevenDayForecast, setSevenDayForecast] = useState(null);
  const navigate = useNavigate();

  const { favorites, addFavorite, removeFavorite } = useFavoritesCities();

  const isFavorite = favorites.some((item) => item.name === cityName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
        );
        const cityData = detailsResponse.data;
        setDetails(cityData);

        const forecastResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7&aqi=no&alerts=yes`
        );

        const forecastData = forecastResponse.data;
        setSevenDayForecast(
          forecastData.forecast && forecastData.forecast.forecastday
        );
      } catch (error) {
        console.error("Errore nella chiamata API:", error);
        navigate("/");
      }
    };

    fetchData();
  }, [cityName, navigate]);

  const handleToggleFavorites = () => {
    if (isFavorite) {
      removeFavorite(cityName);
    } else {
      addFavorite({ id: uuidv4(), name: details.location.name, details });
    }
  };

  return (
    <div className={styles.cityDetailsContainer}>
      {details ? (
        <div className={styles.cityDetailsForContainer}>
          <div className={styles.cityDetailsForDetails}>
            <h2>
              {details.location.name}, {details.location.country}
            </h2>
            <p>Regione: {details.location.region}</p>
            <div>
              <div className={styles.weatherIconContainer}>
                <img
                  src={details.current.condition.icon}
                  alt="Weather"
                  className={styles.weatherIcon}
                />
              </div>
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
              Ora dell'ultima osservazione:{" "}
              {details.current.last_updated || "Dato non disponibile"}
            </p>
            <div>
              <button
                className={`${styles.addToFavoritesButton} ${
                  isFavorite
                    ? styles.removeFavoriteButton
                    : styles.addFavoriteButton
                }`}
                onClick={handleToggleFavorites}
              >
                {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              </button>
            </div>
          </div>
          <div className={styles.sevenDayForecastContainer}>
            <p>Previsioni per i prossimi giorni:</p>
            <div className={styles.sevenDayForecastContainer}>
              {sevenDayForecast &&
                sevenDayForecast.map((day) => {
                  const dayDate = new Date(day.date);
                  const worldDate = format(dayDate, "EEEE", {
                    locale: it,
                  });
                  return (
                    <div key={day.date} className={styles.dayForecastItem}>
                      <p>{worldDate}</p>
                      <img src={day.day.condition.icon} alt="Weather" />
                      <p> Giorno: {day.day.maxtemp_c}°C</p>
                      <p> Notte: {day.day.mintemp_c}°C</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default CityDetails;
