import React from 'react';
import { Link } from 'react-router-dom';

const CityList = ({ cities, onCityClick }) => (
  <div>
    <h1>Lista Città</h1>
    <ul>
      {cities.map(city => (
        <li key={city.id}>
          <Link to={`/details/${city.name}`} onClick={() => onCityClick(city.name)}>
            {city.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default CityList;

