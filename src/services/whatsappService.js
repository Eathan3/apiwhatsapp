const { text } = require('express');
const path = require('path');

consthttps = require('https');
function sendMessageWhatsApp(textResponse, number) {
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
                authorization: "Bearer EAATidZB8ZC87wBO5GCakoNriWLximSCWxTvQbJUJ3lMhaBRzFAhl1xPRXg5VTKbpTSB6RlhrwHwA39zJZBzVrp24jJ6sZBvjb3yaI6MJMG781VD7HxBpak8oeBHLIUQ71HQvMZCa1lZB7Q6bisuPOOiD4LeqiYNk6KCNEMTu5zTFnCMeMvHMZAHZCmlmVUQrUSNkLe93ozCVvZANlEtWJZAVbAplTLAasXdKUJ4ZBYv7Tetor17NYXT0AZBV "
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

module.exports = { sendMessageWhatsApp };