import React  from 'react';
import { Link } from 'react-router-dom';
import styles from './CityList.module.css';
import citiesData from '../../data/citiesData/citiesData';

const CityList = () => (
  <div className={styles.cityListContainer}>
    <ul className={styles.cityContainerPoint}>
      {citiesData.map(city => (
        <li key={city.id} className={styles.cityContainer}>
          <Link to={`/details/${city.name}`} className={styles.linkStyle}>
          <div className={styles.cityName}>{city.name}</div>
            <div className={styles.countryName}>{city.country}</div>
          </Link>
        </li>
      ))}
    </ul>
  </div>

);


export default CityList;


