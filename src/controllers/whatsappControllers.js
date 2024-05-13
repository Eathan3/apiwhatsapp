const VerifyToken = (req, res) =>{

    try {
        var accessToken = "NEONATECH2024";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken){
            res.send(challenge);
        }else{
            res.status(400).send();
        }    

    }catch(e){
        res.status(400).send();

    }
    
}

const ReceivedMessage = (req, res) =>{
    res.send("hola Received");
}

module.exports = {
    VerifyToken,
    ReceivedMessage 
}
