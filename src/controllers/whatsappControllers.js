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
    res.send("hola Received");  // Considera expandir esta función
}

module.exports = {
    VerifyToken,
    ReceivedMessage 
}
