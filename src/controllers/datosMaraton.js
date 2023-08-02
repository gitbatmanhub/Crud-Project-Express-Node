const e = require("express");
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT CONCAT(nameCliente, \' \', apellidoCliente) AS nombreCompleto, idCliente FROM cliente;', (err, cliente) => {
            if (err) {
                res.json(err)
            }

            res.render('index', {
                cliente
            })
        })
    })
};

const agregarcliente = {};
agregarcliente.agg = (req, res) => {
    //console.log(req.body)
    const {nombreCliente, apellidoCliente, cedulaCliente} = req.body;
    console.log(req.body);
    const newCliente = {
        nameCliente: nombreCliente,
        apellidoCliente,
        cedulaCliente
    }
    req.getConnection((err, conn) => {
      conn.query('insert into cliente set ?', [newCliente], (err, cliente)=>{
          console.log(err);
          res.redirect('/');
      })

    })
}

const crearFactura={};
crearFactura.crear=(req, res)=>{
    const {idCliente}=req.body;
    const dataFactura={
        idCliente
    };
    req.getConnection((err, conn)=>{
        conn.query('insert into factura set ?', [dataFactura], (err, factura)=>{
            const idInsertado= factura.insertId;
            res.redirect('/datosfactura/'+idInsertado)
        })
    })


}


const facturas={};
facturas.view=(req, res)=>{
    const idFactura=req.params.id;
    req.getConnection((err, conn)=>{
        conn.query('select * from categoria', (err, categoria)=>{
            conn.query('select * from tipoCarrera', (err, tipo)=>{
                conn.query('select * from datosEntradasfactura where idFactura=?', [idFactura], (err, datos)=>{
                    res.render('datosFactura', {
                        categoria,
                        tipo,
                        idFactura,
                        datos

                    })
                })


            })

        })
    })
}


const entradaFactura={};
entradaFactura.agregar=(req, res)=>{
    const {idCategoria, idTipoCarrera, idFactura}=req.body;
    const data ={
        idCategoria,
        idTipoCarrera,
        idFactura
    };
    req.getConnection((err, conn)=>{
        conn.query('select * from categoria where idCategoria=?', [idCategoria], (err, categoria)=>{
            const precioCategoria= categoria[0].precioCategoria;
            conn.query('select * from tipoCarrera where idTipoCarrera=?', [idTipoCarrera], (err, tipoCarrera)=>{
                const precioTipoCarrera= tipoCarrera[0].precioTipoCarrera;

                const precioEntrada=precioTipoCarrera+precioCategoria;
                const dataFacturaEntrada={
                    idCategoria,
                    idTipoCarrera,
                    idFactura,
                    precioEntrada
                }
                conn.query('insert into entrada set ?', [dataFacturaEntrada], (err, entrada)=>{
                    //console.log(err);
                    res.redirect('/datosfactura/'+idFactura)
                })

            })



        })


    })
}


module.exports = {
    controller,
    agregarcliente,
    crearFactura,
    facturas,
    entradaFactura
};