const VerifyToken = (req, res) =>{
    res.send("hola VerifyToken");
}

const ReceivedMessage = (req, res) =>{
    res.send("hola Received");
}

module.exports = {
    VerifyToken,
    ReceivedMessage 
}
