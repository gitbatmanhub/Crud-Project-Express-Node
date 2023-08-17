const e = require("express");
// Controlador para listar clientes
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        // Consulta para obtener los clientes y concatenar su nombre completo
        conn.query('SELECT CONCAT(nameCliente, \' \', apellidoCliente) AS nombreCompleto, idCliente FROM cliente;', (err, cliente) => {
            if (err) {
                // Si hay un error en la consulta, se devuelve un objeto JSON con el error
                res.json(err);
            }

            // Renderiza la vista 'index' con los datos de los clientes
            res.render('index', {
                cliente
            });
        });
    });
};

// Controlador para agregar un nuevo cliente
const agregarcliente = {};
agregarcliente.agg = (req, res) => {
    const { nombreCliente, apellidoCliente, cedulaCliente } = req.body;
    const newCliente = {
        nameCliente: nombreCliente,
        apellidoCliente,
        cedulaCliente
    };
    req.getConnection((err, conn) => {
        // Inserta el nuevo cliente en la base de datos
        conn.query('insert into cliente set ?', [newCliente], (err, cliente) => {
            console.log(err); // Muestra en la consola cualquier error
            res.redirect('/'); // Redirige de vuelta a la página principal
        });
    });
};

// Controlador para crear una nueva factura
const crearFactura = {};
crearFactura.crear = (req, res) => {
    const { idCliente } = req.body;
    const dataFactura = {
        idCliente
    };

    req.getConnection((err, conn) => {
        // Inserta una nueva factura en la base de datos
        conn.query('insert into factura set ?', [dataFactura], (err, factura) => {
            try {
                const idInsertado = factura.insertId;
                // Redirige a la página de datos de factura con el ID de la factura recién creada
                res.redirect('/datosfactura/' + idInsertado);
            } catch (err) {
                console.log(err);
                res.redirect('/');
            }
        });
    });
};

// Controlador para ver los detalles de una factura
const facturas = {};
facturas.view = (req, res) => {
    const idFactura = req.params.id;
    req.getConnection((err, conn) => {
        // Consulta para obtener información relacionada con la factura y sus entradas
        conn.query('select * from categoria', (err, categoria) => {
            conn.query('select * from tipoCarrera', (err, tipo) => {
                conn.query('select * from datosEntradasfactura where idFactura=?', [idFactura], (err, datos) => {
                    conn.query('select * from datosFacturaCliente where idFactura=?', [idFactura], (err, datosFacturaCliente) => {
                        // Renderiza la vista 'datosFactura' con los datos de la factura y sus detalles
                        res.render('datosFactura', {
                            categoria,
                            tipo,
                            idFactura,
                            datos,
                            datosFacturaCliente: datosFacturaCliente[0]
                        });
                    });
                });
            });
        });
    });
};

// Controlador para agregar una nueva entrada a una factura
const entradaFactura = {};
entradaFactura.agregar = (req, res) => {
    const { idCategoria, idTipoCarrera, idFactura } = req.body;
    const data = {
        idCategoria,
        idTipoCarrera,
        idFactura
    };
    req.getConnection((err, conn) => {
        // Consulta para obtener el precio de la categoría seleccionada
        conn.query('select * from categoria where idCategoria=?', [idCategoria], (err, categoria) => {
            try {
                const precioCategoria = categoria[0].precioCategoria;

                // Consulta para obtener el precio del tipo de carrera seleccionado
                conn.query('select * from tipoCarrera where idTipoCarrera=?', [idTipoCarrera], (err, tipoCarrera) => {
                    const precioTipoCarrera = tipoCarrera[0].precioTipoCarrera;
                    const precioEntrada = precioTipoCarrera + precioCategoria;
                    const dataFacturaEntrada = {
                        idCategoria,
                        idTipoCarrera,
                        idFactura,
                        precioEntrada
                    }
                    // Inserta la entrada en la base de datos
                    conn.query('insert into entrada set ?', [dataFacturaEntrada], (err, entrada) => {
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

// Controlador para renderizar una vista de error
const err = {};
err.err = (req, res) => {
    res.render('err');
}

// Controlador para borrar una entrada de una factura
const borrarentrada = {};
borrarentrada.delet = (req, res) => {
    const { idEntrada, idFactura } = req.body;
    req.getConnection((err, conn) => {
        // Borra la entrada de la base de datos
        conn.query('delete from entrada where idEntrada=?', [idEntrada], (err, entradas) => {
            console.log(err);
            res.redirect('datosfactura/' + idFactura);
        })
    })
}

// Controlador para cerrar una factura
const cerrar = {};
cerrar.close = (req, res) => {
    const { idFactura, totalFactura } = req.body;
    const dataFactura = {
        idFactura: idFactura[0],
        totalFactura: totalFactura[0]
    }
    req.getConnection((err, conn) => {
        // Actualiza el estado y el total de la factura en la base de datos
        conn.query('update factura set estadoFactura=1, totalFactura=?  where idFactura=?', [totalFactura, idFactura], (err, estadoFactura) => {
            res.redirect('datosfactura/' + idFactura);
        })
    })
}

// Controlador para ver todas las facturas
const ver = {};
ver.view = (req, res) => {
    req.getConnection((err, conn) => {
        // Consulta para obtener todas las facturas y su contador
        conn.query('select * from todasFacturas', (err, todasFacturas) => {
            conn.query('select count(idFactura) as contador from todasFacturas', (err, contador) => {
                conn.query('select count(idEntrada) as contador from entrada', (err, contadorE) => {
                    if (err) {
                        res.json(err);
                    }

                    // Renderiza la vista 'facturas' con los datos de todas las facturas y sus contadores
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

// Controlador para consultar facturas por fecha
const consultarFacturas = {};
consultarFacturas.buscar = (req, res) => {
    const { fecha1, fecha2 } = req.body;
    req.getConnection((err, conn) => {
        // Consulta para obtener las facturas en un rango de fechas y sus contadores
        conn.query('select * from todasFacturas where Fecha between ? and ?;', [fecha1, fecha2], (err, todasFacturas) => {
            conn.query('select count(idFactura) as contador from todasFacturas where Fecha between ? and ?;', [fecha1, fecha2], (err, contador) => {
                Fecha1H = fecha1 + ' 00:00:00';
                Fecha2H = fecha2 + ' 23:59:00';

                // Consulta para obtener el contador de entradas en un rango de fechas
                conn.query('select count(idEntrada) as contador from entrada where fechaHora between ? and ?;', [Fecha1H, Fecha2H], (err, contadorE) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('facturas', {
                        todasFacturas: todasFacturas,
                        contador: contador[0],
                        contadorE: contadorE[0]
                    }); // Renderiza la vista 'facturas' con los datos filtrados
                })
            })
        });
    });
}

// Exporta los controladores
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
