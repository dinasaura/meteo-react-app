import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CityList.module.css';

const CityList = ({ cities, onCityClick }) => (
  <div>
    <h1>Lista Città</h1>
    <ul>
      {cities.map(city => (
        <li key={city.id} className={styles.linkContainer}>
          <Link to={`/details/${city.name}`} onClick={() => onCityClick(city.name)} className={styles.linkStyle}>
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default CityList;

