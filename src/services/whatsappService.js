const { text } = require('express');
const path = require('path');

consthttps = require('https');
function sendMessageWhatsaApp(textResponse, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "text": {
            "body":textResponse
        },
        "type": "text"
    });

    const options = {
       host: "https://graph.facebook.com/",
       path: "/v19.0/259514863922267/messages",
         method: "POST",
         body: data,
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " +process.env.WHATSAPP_API_TOKEN
    }};
    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

module.exports = { sendMessageWhatsaApp };