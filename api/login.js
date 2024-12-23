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
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10746779',
    password: 'FmXS5ZjSwz',
    database: 'sql10746779'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM usuario WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error en la consulta' });
        }

        if (results.length > 0) {
            res.status(200).send({ message: 'Inicio de sesión exitoso', user: results[0] });
        } else {
            res.status(401).send({ message: 'Credenciales incorrectas' });
        }
    });
});
// Ruta para obtener asignaturas por alumno
app.get('/api/asignaturas/:usuarioRut', (req, res) => {
    const alumnoId = req.params.usuarioRut;

    const sql = `
        SELECT a.sigla, a.seccion, a.nombre
        FROM asignatura a
        JOIN usuario u ON a.alumno = u.rut
        WHERE u.rut = ?
    `;

    db.query(sql, [alumnoId], (err, results) => {
        if (err) {
            console.error('Error al obtener las asignaturas:', err);
            return res.status(500).send({ message: 'Error al obtener las asignaturas' });
        }
        res.status(200).send(results);
    });
});
// Exporta el `app` para Vercel
module.exports = app;
