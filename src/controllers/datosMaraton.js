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
    //console.log(req.body);
    const newCliente = {
        nameCliente: nombreCliente,
        apellidoCliente,
        cedulaCliente
    }
    req.getConnection((err, conn) => {
        conn.query('insert into cliente set ?', [newCliente], (err, cliente) => {
            console.log(err);
            res.redirect('/');
        })

    })
}

const crearFactura = {};
crearFactura.crear = (req, res) => {
    const {idCliente} = req.body;
    const dataFactura = {
        idCliente
    };


    req.getConnection((err, conn) => {
        conn.query('insert into factura set ?', [dataFactura], (err, factura) => {
            try {
                const idInsertado = factura.insertId;
                res.redirect('/datosfactura/' + idInsertado);
            } catch (err) {
                console.log(err);
                res.redirect('/')
            }


        })
    })


}


const facturas = {};
facturas.view = (req, res) => {
    const idFactura = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('select * from categoria', (err, categoria) => {
            conn.query('select * from tipoCarrera', (err, tipo) => {
                conn.query('select * from datosEntradasfactura where idFactura=?', [idFactura], (err, datos) => {
                    conn.query('select * from datosFacturaCliente where idFactura=?', [idFactura], (err, datosFacturaCliente) => {
                        //console.log(datosFacturaCliente);
                        res.render('datosFactura', {
                            categoria,
                            tipo,
                            idFactura,
                            datos,
                            datosFacturaCliente: datosFacturaCliente[0]
                        })
                    })
                })


            })

        })
    })
}


const entradaFactura = {};
entradaFactura.agregar = (req, res) => {
    const {idCategoria, idTipoCarrera, idFactura} = req.body;
    const data = {
        idCategoria,
        idTipoCarrera,
        idFactura
    };
    req.getConnection((err, conn) => {
        conn.query('select * from categoria where idCategoria=?', [idCategoria], (err, categoria) => {
            try {
                const precioCategoria = categoria[0].precioCategoria;

                conn.query('select * from tipoCarrera where idTipoCarrera=?', [idTipoCarrera], (err, tipoCarrera) => {
                    const precioTipoCarrera = tipoCarrera[0].precioTipoCarrera;
                    const precioEntrada = precioTipoCarrera + precioCategoria;
                    const dataFacturaEntrada = {
                        idCategoria,
                        idTipoCarrera,
                        idFactura,
                        precioEntrada
                    }
                    conn.query('insert into entrada set ?', [dataFacturaEntrada], (err, entrada) => {
                        //console.log(err);
                        res.redirect('/datosfactura/' + idFactura)
                    })

                })
            } catch (err) {
                console.log(err)
                res.redirect('/datosfactura/' + idFactura)

            }
        })
    })
}
const err = {};
err.err = (req, res) => {
    res.render('err')
}

const borrarentrada = {};
borrarentrada.delet = (req, res) => {
    const {idEntrada, idFactura} = req.body;
    req.getConnection((err, conn) => {
        conn.query('delete from entrada where idEntrada=?', [idEntrada], (err, entradas) => {
            console.log(err)
            res.redirect('datosfactura/' + idFactura)
        })
    })
}
const cerrar = {};
cerrar.close = (req, res) => {
    const {idFactura, totalFactura} = req.body;
    //console.log(req.body)
    const dataFactura = {
        idFactura: idFactura[0],
        totalFactura: totalFactura[0]
    }
    //console.log(dataFactura);
    //console.log(idFactura)
    req.getConnection((err, conn) => {
        conn.query('update factura set estadoFactura=1, totalFactura=?  where idFactura=?', [totalFactura, idFactura], (err, estadoFactura) => {
            res.redirect('datosfactura/' + idFactura)
        })
    })
}

const ver = {};
ver.view = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from todasFacturas', (err, todasFacturas) => {
            conn.query('select count(idFactura) as contador from todasFacturas', (err, contador) => {
                conn.query('select count(idEntrada) as contador from entrada', (err, contadorE) => {
                    if (err) {
                        res.json(err);
                    }

                    res.render('facturas', {
                        todasFacturas: todasFacturas,
                        contador: contador[0],
                        contadorE: contadorE[0]
                    });
                })
            })
        });
    });
};
const consultarFacturas = {};
consultarFacturas.buscar = (req, res) => {
    const {fecha1, fecha2} = req.body;
    req.getConnection((err, conn) => {
        conn.query('select * from todasFacturas where Fecha between ? and ?;', [fecha1, fecha2], (err, todasFacturas) => {
            conn.query('select count(idFactura) as contador from todasFacturas where Fecha between ? and ?;', [fecha1, fecha2], (err, contador) => {
                Fecha1H=fecha1+ ' 00:00:00';
                Fecha2H=fecha2+ ' 23:59:00';
                console.log(Fecha1H)
                console.log(Fecha2H)

                conn.query('select count(idEntrada) as contador from entrada where fechaHora between ? and ?;', [Fecha1H , Fecha2H], (err, contadorE) => {
                    if (err) {
                        res.json(err);
                        //console.log(err)
                    }
                    console.log(contadorE[0])
                    res.render('facturas', {
                        todasFacturas: todasFacturas,
                        contador: contador[0],
                        contadorE:contadorE[0]
                    }); // Pasa toda la variable todasFacturas
                })
            })
        });
    });
}


module.exports = {
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
};