const express = require('express');
const cors = require('cors');
const app = express(); // generoidaan express app, muuttujaan app
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// JSON
// {
//   "name": "John",
//   "age": 30
// }
// =>
// JavaScript map
// {
//   name: 'John',
//   age: 30
// }

// Middleware, eli koodia, joka suoritetaan jokaisen yhteyden alussa
// esim app.use(logger()); // Kuvitteellinen logger-kirjasto, joka tallentaisi kaikki requestit talteen
//app.use(cors());

// routes import
const helloRoute = require('./routes/hello');
const chatStream = require('./routes/chatStream');
const messageRoute = require('./routes/message');


// use routes
app.use('/', helloRoute);
app.use('/', chatStream);
app.use('/api/messages', messageRoute);

// Palvelin lähtee käyntiin
app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
});