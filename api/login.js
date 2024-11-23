const mysql = require('mysql');

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'sql10746779',
});


app.use(cors());
// Función para manejar la solicitud POST
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM usuario WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en la consulta' });
      }

      if (results.length > 0) {
        // Si las credenciales coinciden
        res.status(200).json({ message: 'Inicio de sesión exitoso', user: results[0] });
      } else {
        // Si las credenciales no son correctas
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    });
  } else {
    // Si no es un POST, responder con un error
    res.status(405).json({ message: 'Método no permitido' });
  }
};
