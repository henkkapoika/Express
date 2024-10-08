// redis käytössä express palvelimessa
const express = require('express');
const redis = require('redis');
 
const app = express();

// Redis osio
// Aktivoidaan funktioita eventien perusteella
const publisher = redis.createClient();
const subscriber = redis.createClient();
 
subscriber.subscribe('chat');
 
subscriber.on('message', (channel, receivedMessage) => {
  // Tämä tehdään kun uusi viesti saapuu
  // Lähetetään HTML-data kaikille kuuntelijoille
  console.log(`Received message: ${receivedMessage} on channel: ${channel}`);
 
});

// route
app.post('/publish', express.json(), (req, res) => {
  // uusi viesti
  // tallennus tietokantaan
  // lähettää uuden viestin kuuntelijoille (aktivoi uusi viesti eventin)
  const { message } = req.body;
 
  publisher.publish('chat', message);
 
  res.send({ status: 'Message sent!' });
});
 
// Palvelin käynnistyy
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});