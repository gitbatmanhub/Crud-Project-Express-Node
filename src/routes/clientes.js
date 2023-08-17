// Importar el módulo 'express'
const express = require('express');

// Crear un enrutador utilizando el módulo 'express.Router()'
const router = express.Router();

// Importar todos los controladores del archivo 'customerCliente.js'
const {
    listClientesController,
    clienteController,
    addLente,
    addLuna,
    facturas,
    crearFactura,
    aggArmazonFactura,
    deleteArmazon,
    agregarLuna,
    deleteLuna,
    cerrarFactura,
    listarFacturas,
    buscarFacturas
} = require('../controllers/customerCliente');

// Rutas para los diferentes controladores

// Ruta para listar los clientes
router.get('/', listClientesController.list);

// Ruta para agregar un nuevo cliente
router.post('/addCliente', clienteController.save);

// Ruta para agregar un nuevo lente
router.post('/addLente', addLente.aggLe);

// Ruta para agregar un nuevo tipo de luna
router.post('/addTipoLuna', addLuna.aggLu);

// Rutas relacionadas con la factura

// Ruta para mostrar la página de una factura específica
router.get('/factura/:id', facturas.crear);

// Ruta para crear una nueva factura
router.post('/crearFactura', crearFactura.make);

// Ruta para agregar un armazón a una factura
router.post('/agregarArmazon', aggArmazonFactura.aggAF);

// Ruta para eliminar un armazón de una factura
router.post('/deleteItemArmazon', deleteArmazon.deleteA);

// Ruta para agregar una luna a una factura
router.post('/agregarLuna', agregarLuna.aggLuna);

// Ruta para eliminar una luna de una factura
router.post('/deleteItemLuna', deleteLuna.deleteLu);

// Ruta para cerrar una factura
router.post('/cerrarFactura', cerrarFactura.close);

// Ruta para buscar facturas por rango de fechas
router.post('/buscarFacturas', buscarFacturas.buscar);

// Ruta para listar todas las facturas
router.get('/listarfacturas', listarFacturas.list);

// Exportar el enrutador para su uso en otros archivos
module.exports = router;
