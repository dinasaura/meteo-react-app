// server.cjs
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Configura CORS
app.use(cors());

// Endpoint per inoltrare le richieste all'API remota
app.get('/api/weather/:city', async (req, res) => {
  try {
    const cityName = req.params.city;
    const apiKey = '14a83ea940ef4d45b5b103446240401';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Errore durante la richiesta API remota:', error);
    res.status(500).json({ error: 'Errore durante la richiesta API remota' });
  }
});

// Gestore di route per la richiesta alla radice
app.get('/', (req, res) => {
  res.send('Benvenuto al server!');
});

// Esempio di endpoint aggiuntivo
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Ciao dal server!' });
});

// Esempio di gestione di file statici (ad esempio, file HTML nella cartella 'public')
app.use(express.static('public'));

// Avvia il server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
