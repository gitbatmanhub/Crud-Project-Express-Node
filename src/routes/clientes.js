const express = require('express');
const router = express.Router();
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
} = require('../controllers/customerCliente')


router.get('/', listClientesController.list);
router.post('/addCliente', clienteController.save);
router.post('/addLente', addLente.aggLe);
router.post('/addTipoLuna', addLuna.aggLu);


//Factura
router.get('/factura/:id', facturas.crear)
router.post('/crearFactura', crearFactura.make);
router.post('/agregarArmazon', aggArmazonFactura.aggAF );
router.post('/deleteItemArmazon', deleteArmazon.deleteA );
router.post('/agregarLuna', agregarLuna.aggLuna);
router.post('/deleteItemLuna', deleteLuna.deleteLu);
router.post('/cerrarFactura', cerrarFactura.close);
router.post('/buscarFacturas', buscarFacturas.buscar);

//Listar Facturas

router.get('/listarfacturas', listarFacturas.list);



module.exports = router;