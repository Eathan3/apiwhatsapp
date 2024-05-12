const express = require("express");
const apiRouter = require("./routes/routes");

const app = express();

const PORT = process.env.PORT || 6770;

app.use(express.json());

app.use("/whatsapp", apiRouter);

app.listen(PORT, () => {console.log("el puerto es: "+PORT)});
