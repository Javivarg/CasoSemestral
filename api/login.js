import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Verifica si la conexión a la base de datos es exitosa
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa con la base de datos');
});

// Tu lógica para manejar las solicitudes sigue aquí...
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        console.error('Error en la consulta a la base de datos:', err);
        return res.status(500).json({ message: 'Error en la base de datos' });
      }
      if (results.length > 0) {
        return res.status(200).json({ message: 'Inicio de sesión exitoso', user: results[0] });
      } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
    });
  } else {
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
