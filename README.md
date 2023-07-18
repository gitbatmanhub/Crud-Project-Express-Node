# Projecto Crud Universidad


## Ejecuto dentro de la carpeta del proyecto

`npm init --yes`

## Instalo los modulos necesarios

- express
- mysql
- express-myconnection
- morgan
- ejs

## Ejecutamos

`npm install express mysql express-myconnection morgan ejs `

## Creamos carpeta src

`mkdir src`

## Creamos archivo app.js dentro de src

Este archivo contendrá la inicialización de nuestro servidor

- Requerimos expresss
- Instanciamos express dentro de una variable (app)
- Configuramos el puerto para que escuche en el puerto 3000

```
const express = require('express');
const app= express();


app.listen(3000, ()=>{
    console.log("Hola mundo ")
});
``` 


## El server necesita reiniciarse solo
Instalamos
- nodemon

`npm install nodemon -D`


## Configuramos el puerto del servidor

```
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), ()=>{
    console.log("Hola mundo ")
});
```

## Agregamos nodemon a los scripts de nodejs

Editamos el archivo package.json

*Antes*
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

*Despues*

```
"scripts": {
    "dev": "nodemon src/app.js"
  }
```

## Configurar vistas

- Creamos dentro de /src una carpeta llamada "views"
- Importamos PATH para acortar las rutas a nivel de proyecto

 `const path = require('path');`
- Configuramos

```
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```


## Configurar Middlewares

### Morgan

- Importamos el modulo Morgan 

`const morgan= require('morgan')`

- Usamos el modulo morgan como función para registrar las peticiones que llegan

`app.use(morgan('dev'));`

## Conexión a la BBDD

- Importamos los modulos de mysql
 ```
const mysql= require('mysql');
const myConnection = require('express-myconnection');
 ```
- Configuramos la conexión

```
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin1223',
    port: 3306,
    database: 'dev'
}, 'single'))
```



## Configuramos rutas y contradores del servidor

### Rutas

- Creamos una carpeta con nombre "routes"
- Creamos un archivo que identifique las rutas que estamos manejando ejm "clientes.js"
- Configuramos el archivo "clientes.js"
 ```
const express = require('express');
const router= express.Router();

module.exports= router;
```
- Importamos las rutas en app.js

`customerRoutes= require('./routes/clientes')`

- Adicional las usamos en una ruta

`app.use('/', customerRoutes)`




### Controladores
- Creamos una carpeta con nombre "controladores"
- Creamos un archivo que identifique los controladores para las rutas que estamos manejando ejm "customerCliente.js"
- Dentro del archivo podemos crear varios metodos, ejm:
```
const controller = {};
controller.list= (req, res)=>{
  res.send('Hello world')
};
module.exports=controller;
```
*Importante: hay que importar el archivo en el archivo de rutas que vayamos a utilizar ejm: cliente.js*

*Antes*
```
const express = require('express');
const router= express.Router();

router.get('/', (req, res)=>{
    res.send("Holaaaa")
})
module.exports= router;
```


*Despues*
```
const express = require('express');
const router= express.Router();
const customerController= require('../controllers/customerCliente')
router.get('/', customerController.list)
module.exports= router;
```

## Crear consultas en los controladores



## Archivos publicos

- Creamos una carpeta dentro de /src llamada "public"

`app.use(express.static(path.join(__dirname, 'public')))`



## Crear vistas y enviar datos a las vistas

- En la carpeta vistas puedes crear las vistas a las cuales van destinados los querys con la extención ".ejs"

- En el archivo customerClient.js 

```
controller.list= (req, res)=>{
  req.getConnection((err, conn)=>{
    conn.query('select * from previs', (err, previs)=>{
      if(err){
        res.json(err)
      }

      console.log(previs)
      res.render('cliente', {
        data: previs
      })
    })
  })
};
```

- En el archivo que recibe la data (La vista que recibe el query)
