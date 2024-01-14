import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CityList.module.css';

const CityList = ({ cities, onCityClick }) => (
  <div className={styles.cityListContainer}>
    <ul className={styles.cityContainerPoint}>
      {cities.map(city => (
        <li key={city.id} className={styles.cityContainer}>
          <Link to={`/details/${city.name}`} onClick={() => onCityClick(city.name)} className={styles.linkStyle}>
          <div className={styles.cityName}>{city.name}</div>
            <div className={styles.countryName}>{city.country}</div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default CityList;


