import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchCity.module.css";
import axios from "axios";
import {apiKey} from "../../constants/index"

const SearchCity = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(true);


  const fetchCities = useCallback(async () => {
    try {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      const response = await axios.get(
        `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`
      );

      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Errore nella ricerca delle città:", error);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCities();
      } catch (error) {
        console.error("Errore nella ricerca delle città:", error);
      }
    };

    fetchData();
  }, [searchTerm, fetchCities]);

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
            <li key={city.id} >
              <Link key={city.id}
                to={`/details/${city.name}`}
                className={styles.resultLink}
                onClick={() => handleCityClick(city.name)}
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
