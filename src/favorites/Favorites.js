import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Favorite.module.css'

const Favorites = ({ favorites, onCityClick, onRemoveFromFavorites }) => {
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("Stored Favorites:", storedFavorites);
    onCityClick(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className={styles.favoritesContainer}>
      <h2>Città Preferite :</h2>
      <ul>
        {favorites.map((city) => (
          <li key={city.id} className={styles.favoriteItem}>
            {city.name}, {city.details && city.details.location.country}
            <div className={styles.buttonContainer}>
              <Link to={`/details/${city.name}`} className={styles.detailsButton}>
                Dettagli
              </Link>
              <button
                onClick={() => onRemoveFromFavorites(city.id)}
                className={styles.removeButton}
              >
                Rimuovi
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Favorites;
