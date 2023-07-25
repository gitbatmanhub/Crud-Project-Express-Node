const express = require('express');
const router= express.Router();
const customerController= require('../controllers/customerCliente')



router.get('/', customerController.list);



module.exports= router;