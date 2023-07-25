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

# Creamos la carpeta partials dentro de la carpeta views

- Dentro de la carpera partials creamos los archivos principales de nuestras vistas como son el header.ejs y el footer.ejs (2 archivos separados)

## Dentro de header

```

<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>App</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">App Name App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>

                </ul>

            </div>
        </div>
    </nav>
</header>



```

### Dentro del archivo footer.ejs

```
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>
</body>
</html>

```


### Para llamar a estos archivos a las vistas colocamos en cada vista que vayamos a utilizar




- Llamar al Header

`<%- include('partials/header.ejs') -%>`

- Llamar al Footer

`<%- include('partials/footer.ejs') -%>`


