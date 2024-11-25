require('dotenv').config();
const sql = require('mssql');

// Configuración para conectar a la base de datos
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: true, // Cambiar a false si no usás SSL
        trustServerCertificate: true // Usar true si el certificado no está firmado por una entidad confiable
    }
};

// Probar la conexión
async function testConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("Conexión exitosa a la base de datos");
        pool.close(); // Cierra la conexión después de la prueba
    } catch (err) {
        console.error("Error al conectar a la base de datos:", err);
    }
}

testConnection();