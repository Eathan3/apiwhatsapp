const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./logs.txt'));
require('dotenv').config(); // Asegúrate de instalar el paquete dotenv

const VerifyToken = (req, res) => {
    try {
        const accessToken = process.env.ACCESS_TOKEN;  // Usa variable de entorno
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token === accessToken) {
            res.send(challenge);
        } else {
            res.status(400).send({ error: "Invalid token or challenge missing" });
        }    
    } catch (e) {
        console.error(e); // Logra el error
        res.status(500).send({ error: "Internal server error" });
    }  
}

const ReceivedMessage = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (req.body["changes"][0];
        var value = changes["value"];
        var messageObject = value["message"];
        myConsole.log(messageObject);
        res.send("EVENT_RECEIVED");

    }catch(e){
        res.send("EVENT_RECEIVED");

    }

}

module.exports = {
    VerifyToken,
    ReceivedMessage 
}
