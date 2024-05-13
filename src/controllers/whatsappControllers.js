const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./logs.txt'));
require('dotenv').config(); 
const whatsappService = require("../services/whatsappService");// Asegúrate de instalar el paquete dotenv

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
        console.error(e); // Registra el error
        res.status(500).send({ error: "Internal server error: " + e.message });
    }  
}

const ReceivedMessage = (req, res) => {
    try {
        var entry = (req.body["entry"])[0];
       var changes = (entry["changes"])[0];
       var value = changes["value"];
       var messageObject = value["messages"];

       if(typeof messageObject != "undefined"){
       var messages = messageObject[0];
        var number = messages["from"]; 
        var text = GetTestUser(messages);
       

        myConsole.log(text);
        whatsappService.sendMessageWhatsaApp("el usuarios dijo" + text, number); // Envia el mensaje
    }
       res.send("EVENT_RECEIVED"); // Registra el mensaje
    } catch (e) {
        myConsole.log(e);  // Registra el error
        res.send("EVENT_RECEIVED");
    }
}

function GetTestUser(messages){
    var text = "";
    
   var typeMessage = messages["type"];
   if (typeMessage === "text"){
    text = (messages["text"])["body"];
    console.log(text);
}
else if (typeMessage === "interactive"){
    var interactiveObject = messages["interactive"];
    var typeInteractive = interactiveObject["type"];
    myConsole.log(interactiveObject);
    if (typeInteractive === "button_reply"){
        text = (interactiveObject["button_reply"])["title"];

    }
    else if(typeInteractive === "list_reply"){
        text = (interactiveObject["list_reply"])["title"];

    }else{
        myConsole.log("Tipo de mensaje no reconocido");
    }
  
}else{ myConsole.log("Tipo de mensaje no reconocido");}
return text;
}



    module.exports = {
    VerifyToken,
    ReceivedMessage 
}
