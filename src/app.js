// Importación de módulos necesarios
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const app = express();

// Importación de las rutas definidas en otro archivo
const customerRoutes = require('./routes/clientes');

// Configuración de la aplicación

// Configuración del puerto de la aplicación, si no se proporciona se usa el puerto 3000
app.set('port', process.env.PORT || 3000);

// Configuración del motor de vistas (EJS)
app.set('view engine', 'ejs');

// Definición de la carpeta donde se encuentran las vistas
app.set('views', path.join(__dirname, 'views'));

// Configuración de los middlewares

// Morgan es un middleware que registra las solicitudes HTTP en la consola (para propósitos de desarrollo)
app.use(morgan('dev'));

// Conexión a la base de datos MySQL usando express-myconnection
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin1223',
    port: 3306,
    database: 'maraton'
}, 'single'));

// Configuración de las rutas

// Uso de las rutas definidas en customerRoutes cuando se accede a la ruta raíz ("/")
app.use('/', customerRoutes);

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Inicio del servidor

// Escucha en el puerto definido en app.set('port') y muestra un mensaje en la consola
app.listen(app.get('port'), () => {
    console.log("Hola mundo ");
    console.log("Server corriendo en el puerto: " + app.get('port'));
});
