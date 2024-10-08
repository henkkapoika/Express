const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Tietokanta yhteys
// muista ympäristö muuttujat
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql_db', // sama kuin docker tiedostossa
    user: 'root',
    password: 'root',
    database: 'messages',
    port: 3306,
});

// Tämä yhteys säilyy kaikille käyttäjille
// Jossain tilanteissa käytetään "connection pool" tekniikkaa, jos käyttöä on paljon
db.connect((error) => {
    console.log("Trying to connect");
    if(error){
        console.error("Error connecting to MySQL ", error);
        return;
    }
    console.log("Connected to MySQL")
});

// /api/messages/send
router.post('/send', (req, res) => {
    // Otetaan data muuttujiin
    const { userId, message } = req.body;

    console.log(`Received: userId - ${userId}, message - ${message}`);

    // Tallennus MySQL-tietokantaan
    const query = 'INSERT INTO message (userId, message) VALUES (?, ?)';
    db.query(query, [userId, message], (error, result) => {
        // funktio, query() funktion jälkeen
        if(error){
            console.error("Error inserting data: ", error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({message: 'Data inserted succesfully. ', result});
    });

});


module.exports = router;