const express = require('express');
const router= express.Router();
const {listClientesController, clienteController}= require('../controllers/customerCliente')



router.get('/', listClientesController.list);

router.post('/addCliente', clienteController.save);





module.exports= router;