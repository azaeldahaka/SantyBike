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
        encrypt: true,
        trustServerCertificate: true
    }
};

// Función para conectar y obtener el pool
const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("Conexión exitosa a la base de datos");
        return pool;
    } catch (err) {
        console.error("Error al conectar a la base de datos:", err);
        throw err;
    }
};

module.exports = {
    getConnection,
    sql
};
