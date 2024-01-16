import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import citiesData from "../../data/citiesData/citiesData";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.cityListContainer}>
        <ul className={styles.cityContainerPoint}>
          {citiesData.map((city) => (
            <li key={city.id} className={styles.cityContainer}>
              <Link to={`/details/${city.name}`} className={styles.linkStyle}>
                <div className={styles.cityName}>{city.name}</div>
                <div className={styles.countryName}>{city.country}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
