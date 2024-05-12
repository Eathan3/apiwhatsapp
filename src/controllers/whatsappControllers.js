const VerifyToken = (req, res) =>{

    try {
        var accessToken = "neonatech2024";
        var token = req.query["hub.verify_token"];
        var challenge = req.body["hub.challenge"];

        if(challenge != null && token != null && token == accessToken){
            res.status(200).send(challenge);
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
