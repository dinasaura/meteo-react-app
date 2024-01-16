import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchCity.module.css";

const SearchCity = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]);
          return;
        }

        const response = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=14a83ea940ef4d45b5b103446240401&q=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error("Errore nella ricerca delle città");
        }

        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Errore nella ricerca delle città:", error);
      }
    };

    fetchCities();
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setShowResults(true);
  };

  const handleCityClick = () => {
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Cerca città..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchInput}
      />

      {showResults && searchTerm && (
        <ul className={styles.searchResults}>
          {searchResults.map((city) => (
            <li key={city.id}>
              <Link
                to={`/details/${city.name}`}
                className={styles.resultLink}
                onClick={handleCityClick}
              >
                {city.name}, {city.country}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCity;
