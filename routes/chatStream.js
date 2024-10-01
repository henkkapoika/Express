const express = require('express');
const router = express.Router();

let latestId = 0;

router.get('/stream', (req, res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendMessage = () => {
        // tässä oikeasti tutkitaan, onko uusi viesti keskutelussa vai ei
        if(Math.random() < 0.5){
            // jos on uusi viesti
            const newMessage = {
                message_id: latestId++,
                content: `Test message ${latestId}`,
                user_id: 1,
                username: 'Test',
                parent_message_id: null,
                sent_at: new Date().toISOString()
            };
            
            res.write(`data: ${JSON.stringify(newMessage)}\n\n`);


        } else {
            res.write(': keep-alive\n\n');
        }
    }

    // luodaan event, joka suorittaa määritetyn funktion 1.5 sekunnin välein
    const intervalId = setInterval(sendMessage, 1500);

});

module.exports = router;