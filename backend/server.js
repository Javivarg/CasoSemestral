// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'caso_semestral'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM usuario WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error en la consulta' });
        }

        if (results.length > 0) {
            // Si las credenciales coinciden, devolver el usuario
            res.status(200).send({ message: 'Inicio de sesión exitoso', user: results[0] });
        } else {
            // Si no se encuentra el usuario con las credenciales
            res.status(401).send({ message: 'Credenciales incorrectas' });
        }
    });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor Express en el puerto 3000');
});
