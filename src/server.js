const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static("public"));

// Ruta por defecto
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
