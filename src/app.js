const express = require('express');
const path = require('path');
const morgan= require('morgan')
const mysql= require('mysql2');
const myConnection = require('express-myconnection');
const app= express();


//Importamos Rutas
customerRoutes= require('./routes/clientes')




//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configurar Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin1223',
    port: 3306,
    database: 'maraton'
}, 'single'))


//Routes

app.use('/', customerRoutes)



//Static Files
app.use(express.static(path.join(__dirname, 'public')))


app.listen(app.get('port'), ()=>{
    console.log("Hola mundo ")
    console.log("Server corriendo en el puerto: " + app.get('port'))
});