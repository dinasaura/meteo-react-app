import { v4 as uuidv4 } from 'uuid';

const citiesData = [
  { id: uuidv4(), name: "London", country: 'United Kingdom', details: {} },
  { id: uuidv4(), name: "Paris", country: 'France', details: {} },
  { id: uuidv4(), name: "New York", country: 'United States of America', details: {} },
  { id: uuidv4(), name: "Tokyo", country: 'Japan', details: {} },
  { id: uuidv4(), name: "Milan", country: 'Italy', details: {} },
];

export default citiesData;