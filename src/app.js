// Importar los módulos y paquetes necesarios
const express = require('express'); // Framework web para Node.js
const path = require('path'); // Proporciona utilidades para trabajar con rutas de archivos y directorios
const morgan = require('morgan'); // Middleware para registrar solicitudes HTTP en la consola
const mysql = require('mysql2'); // Cliente de base de datos MySQL
const myConnection = require('express-myconnection'); // Middleware para manejar conexiones de bases de datos
const app = express(); // Crear una instancia de la aplicación Express

// Importar rutas personalizadas
const customerRoutes = require('./routes/clientes'); // Rutas relacionadas con los clientes

// Configuración de la aplicación
app.set('port', process.env.PORT || 3000); // Configurar el puerto en el que se ejecutará la aplicación
app.set('view engine', 'ejs'); // Configurar el motor de vistas EJS
app.set('views', path.join(__dirname, 'views')); // Configurar la ubicación de las vistas

// Configurar Middlewares
app.use(morgan('dev')); // Usar el middleware morgan para registrar las solicitudes en la consola
app.use(
    myConnection(mysql, {
        host: 'localhost',
        user: 'root',
        password: 'admin1223',
        port: 3306,
        database: 'maraton',
    }, 'single')
); // Usar el middleware myConnection para gestionar las conexiones a la base de datos

// Configurar el middleware para analizar los datos de formulario
app.use(express.urlencoded({ extended: false }));

// Usar las rutas definidas en customerRoutes
app.use('/', customerRoutes);

// Configurar middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor en el puerto configurado
app.listen(app.get('port'), () => {
    console.log("Hola mundo ");
    console.log("Server corriendo en el puerto: " + app.get('port'));
});
