import React from "react";
import { Link } from "react-router-dom";
import styles from './Favorite.module.css'
import useFavoritesCities from "../../hooks/useFavoritesCities";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoritesCities();

  return (
    <div className={styles.favoritesContainer}>
      <h2>Città Preferite:</h2>
      <ul>
        {favorites.map((city) => (
          <li key={`${city.name}-${city.id}`} className={styles.favoriteItem}>
            {city.name}, {city.details && city.details.location.country}
            <div className={styles.buttonContainer}>
              <Link to={`/details/${city.name}`} className={styles.detailsButton}>
                Dettagli
              </Link>
              <button
                onClick={() => removeFavorite(city.name)}
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