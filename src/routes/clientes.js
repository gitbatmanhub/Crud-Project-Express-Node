const express = require('express');
const router = express.Router();
const {
    listClientesController,
    clienteController,
    addLente,
    addLuna,
    facturas,
    crearFactura
} = require('../controllers/customerCliente')


router.get('/', listClientesController.list);
router.post('/addCliente', clienteController.save);
router.post('/addLente', addLente.aggLe);
router.post('/addTipoLuna', addLuna.aggLu);


//Factura
router.get('/factura/:id', facturas.crear)
router.post('/crearFactura', crearFactura.make);


module.exports = router;