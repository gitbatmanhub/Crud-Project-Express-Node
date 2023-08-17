// Importamos las bibliotecas necesarias
const express = require('express'); // Importamos la biblioteca Express, que facilita la creación de aplicaciones web.
const path = require('path'); // Importamos la biblioteca 'path', que ayuda a manejar rutas de archivos y directorios.
const morgan = require('morgan'); // Importamos 'morgan' para registrar solicitudes HTTP en la consola.
const mysql = require('mysql2'); // Importamos 'mysql2' para interactuar con bases de datos MySQL.
const myConnection = require('express-myconnection'); // Importamos 'express-myconnection' para facilitar la conexión a la base de datos.
const { urlencoded } = require("express"); // Importamos 'urlencoded' de 'express' para analizar datos de formularios.
const app = express(); // Creamos una instancia de la aplicación Express.

// Importamos las rutas definidas en el archivo de rutas 'clientes.js'
const customerRoutes = require('./routes/clientes'); // Importamos un conjunto de rutas desde el archivo 'clientes.js'.

// Configuración de la aplicación
app.set('port', process.env.PORT || 3000); // Configuramos el puerto en el que la aplicación escuchará.
app.set('view engine', 'ejs'); // Configuramos el motor de plantillas 'ejs' para renderizar vistas.
app.set('views', path.join(__dirname, 'views')); // Configuramos la ubicación de las vistas.

// Configuración de Middlewares
app.use(morgan('dev')); // Usamos 'morgan' en modo 'dev' para registrar solicitudes en la consola.
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin1223',
    port: 3306,
    database: 'optica'
}, 'single')); // Configuramos la conexión a la base de datos MySQL.

app.use(express.urlencoded({ extended: false })); // Configuramos 'urlencoded' para analizar datos del formulario.

// Rutas
app.use('/', customerRoutes); // Usamos las rutas definidas en 'clientes.js' cuando la URL comienza con '/'.

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public'))); // Configuramos la ubicación de archivos estáticos.

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log("Hola mundo");
    console.log("Server corriendo en el puerto: " + app.get('port')); // Iniciamos el servidor y mostramos un mensaje en la consola.
});
