const express = require('express');
const router = express.Router();

const {
    controller,
    agregarcliente,
    crearFactura,
    facturas,
    entradaFactura,
    err,
    borrarentrada,
    cerrar,
    ver,
    consultarFacturas
} = require('../controllers/datosMaraton')

/*

Este código define las rutas y vincula cada ruta con su correspondiente controlador y función. Cada ruta está asociada a una acción específica, como listar clientes, insertar un nuevo cliente, crear una factura, ver detalles de una factura, agregar entrada a una factura, borrar entrada, cerrar factura, ver todas las facturas y consultar facturas por fecha. Las rutas que no coinciden con ninguna definida redirigirán al usuario a la página principal.

*/

// Ruta para mostrar la lista de clientes
router.get('/', controller.list);

// Ruta para insertar un nuevo cliente
router.post('/insertarcliente', agregarcliente.agg);

// Ruta para crear una nueva factura
router.post('/crearfactura',  crearFactura.crear);

// Ruta para ver los detalles de una factura
router.get('/datosfactura/:id', facturas.view );

// Ruta para agregar una entrada a una factura
router.post('/entradaFactura', entradaFactura.agregar);

// Ruta para borrar una entrada de una factura
router.post('/borrarentrada', borrarentrada.delet);

// Ruta para cerrar una factura
router.post('/cerrarFactura', cerrar.close);

// Ruta para ver todas las facturas
router.get('/verFacturas', ver.view);

// Ruta para consultar facturas por fecha
router.post('/consultarFactura', consultarFacturas.buscar);

// Si no se encuentra ninguna ruta válida, redirecciona a la página principal
router.use((req, res) => {
    res.redirect('/');
});

module.exports = router;
