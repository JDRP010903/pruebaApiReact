require("dotenv").config();
const express = require("express");
const dbConnection = require("./database/config.js")
const cors = require("cors")

dbConnection();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.json({
        msg: "Bienvenido a la API"
    });
});

app.use("/usuarios", require("./routes/users.routes.js"))
app.use("/productos", require("./routes/productos.routes.js"))
app.use("/auth", require("./routes/auth.routes.js"))

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})