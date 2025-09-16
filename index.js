// index.js - Punto de entrada local

const app = require('./src/server');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
