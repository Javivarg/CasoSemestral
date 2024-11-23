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
// api/login.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
      }
  
      try {
        // Aquí debes agregar la lógica de autenticación
        const user = await authenticateUser(email, password); // Implementa tu función de autenticación
        if (user) {
          return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        } else {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
      } catch (error) {
        console.error('Error en la autenticación:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
      }
    } else {
      return res.status(405).json({ message: 'Método no permitido' });
    }
  }
  
  async function authenticateUser(email, password) {
    // Aquí implementas tu lógica de autenticación
    // Por ejemplo, verificando contra una base de datos o un servicio externo
    if (email === 'test@example.com' && password === 'password123') {
      return { nombre: 'John Doe' };
    }
    return null;
  }
  
