import React from "react";
import CityList from "./CityList";
import styles from "./Home.module.css";

const Home = ({ cities, onCityClick }) => {
  return (
    <div className={styles.homeContainer}>
      <CityList cities={cities} onCityClick={onCityClick} />
    </div>
  );
};

export default Home;

