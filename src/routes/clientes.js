const express = require('express');
const router = express.Router();
const {
    controller,
    agregarcliente,
    crearFactura,
    facturas,
    entradaFactura
} = require('../controllers/datosMaraton')


router.get('/', controller.list);
router.post('/insertarcliente', agregarcliente.agg);
router.post('/crearfactura',  crearFactura.crear);
router.get('/datosfactura/:id', facturas.view );
router.post('/entradaFactura', entradaFactura.agregar)

module.exports = router;