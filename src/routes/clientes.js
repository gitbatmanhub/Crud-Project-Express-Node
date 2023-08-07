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
    ver
} = require('../controllers/datosMaraton')


router.get('/', controller.list);
router.post('/insertarcliente', agregarcliente.agg);
router.post('/crearfactura',  crearFactura.crear);
router.get('/datosfactura/:id', facturas.view );
router.post('/entradaFactura', entradaFactura.agregar)
router.post('/borrarentrada', borrarentrada.delet)
router.post('/cerrarFactura', cerrar.close)
router.get('/verFacturas', ver.view);

router.use((req, res) => {
    res.redirect('/');
});

module.exports = router;