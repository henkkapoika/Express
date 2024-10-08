const express = require('express');
const router = express.Router();

// kun toinen käyttäjä lähettää viestin, voidaan havaita se jonkin muuttujan kautta
// ei tarvitse tutkia tietokantaa uudelleen
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

            // Generoidaan HTML-koodit
            const messageHTML = `<div class="message"><div class="icon"><h2>${newMessage.username[0].toUpperCase()}</h2></div><div class="message-content message-received"><p class="text">${newMessage.content}</p><div class="message-footer"><p class="reply">Reply</p><p class="time">123</p></div></div></div>`;
            
            res.write(`data: ${messageHTML}\n\n`);


        } else {
            res.write(': keep-alive\n\n');
        }
    }

    // luodaan event, joka suorittaa määritetyn funktion 1.5 sekunnin välein
    const intervalId = setInterval(sendMessage, 1500);

    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });

});

module.exports = router;