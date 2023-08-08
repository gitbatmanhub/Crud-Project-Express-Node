const listClientesController = {};
listClientesController.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT CONCAT(nombreCliente, \' \', apellidoCliente) AS nombreCliente, idCliente FROM cliente;', (err, cliente) => {
            if (err) {
                res.json(err)
            }
            //console.log(cliente)
            res.render('clientes', {
                data: cliente
            })
        })
    })
};

const clienteController = {};
clienteController.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO cliente set ?', [data], (err, cliente) => {
            //console.log(err)
            res.redirect('/');
        })
    })
}

const addLente = {};
addLente.aggLe = (req, res) => {
    const {nameMarca, precio} = req.body;
    const datalente={
        nameMarca,
        precioIndividual: precio
    }
    req.getConnection((err, conn) => {
        conn.query('insert into marca set ?', [datalente], (err, marca) => {
            console.log(err);
            res.redirect('/');
        })
    })
}


const addLuna = {};
addLuna.aggLu = (req, res) => {
    const {nameTipoluna, precio} = req.body;
    const dataLuna={
      nameTipoluna,
      precio
    };
    req.getConnection((err, conn) => {
        conn.query('insert into tipoluna set ?', [dataLuna], (err, marca) => {
            //console.log(err);
            res.redirect('/');
        })
    })
}


const facturas = {};
facturas.crear = (req, res) => {
    const idFactura = req.params;
    //console.log(idFactura.id)

    // Hacer una consulta a la tabla marca
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM marca', (err, marcas) => {
            //console.log(marcas);

            // Hacer una consulta a la tabla tamaño
            conn.query('SELECT * FROM tamano', (err, tamanos) => {
                //console.log(tamaños);

                conn.query('SELECT * from datosArmazonFactura where idFactura=?', [idFactura.id], (err, armazon) => {
                    const Armazon = armazon;
                    //console.log(armazon);
                    conn.query('SELECT * from tipoluna', (err, tipoluna) => {

                        conn.query('SELECT * FROM datosLunaFactura WHERE idFactura=?', [idFactura.id], (err, luna) => {
                            console.log(luna)
                            conn.query('select * from datosClienteFactura where idFactura=?', [idFactura.id], (err, datos) => {
                                //console.log(datos)


                                // Renderizar los resultados en la vista factura
                                res.render('factura', {
                                    idFactura: idFactura,
                                    marcas: marcas,
                                    tamanos: tamanos,
                                    armazon: armazon,
                                    tipoluna: tipoluna,
                                    luna: luna,
                                    datos: datos[0]

                                });
                            });
                        });
                    });
                });
            });
        });
    });
};


const crearFactura = {};

crearFactura.make = (req, res) => {
    const idCliente = req.body;
    //console.log(idCliente);
    req.getConnection((err, conn) => {
        // Insertar el nuevo registro en la tabla "factura"
        conn.query('INSERT INTO factura SET ?', [idCliente], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al insertar la factura.');
                return;
            }

            // Obtener el ID del último registro insertado
            const lastInsertedId = result.insertId;

            res.redirect('/factura/'+lastInsertedId);
        });
    });
};






/*
const crearFactura = {};
crearFactura.make = (req, res) => {
    const idCliente = req.body;
    //console.log(idCliente);
    req.getConnection((err, conn) => {
        conn.query('insert into factura set ?', [idCliente], (err, facturas) => {

            conn.query('SELECT * FROM factura WHERE id = (SELECT MAX(id) FROM factura);', (err, id) => {


                console.log(id);
                res.redirect('/factura/');

            })


        })
    })
};

 */

const aggArmazonFactura = {};
aggArmazonFactura.aggAF = (req, res) => {
    const {idMarca, idTamano, idFactura} = req.body;
    const newArmazon = {idMarca, idTamano, idFactura};


    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM marca where idMarca=?', [idMarca], (err, marcas) => {
            const precioMarcaIndividual = marcas[0].precioIndividual;
            //console.log(precioMarcaIndividual);

            conn.query('SELECT * FROM tamano where idTamano=?', [idTamano], (err, tamanos) => {
                const precioTamanoIndividual = tamanos[0].precioIndividual;
                //console.log(precioTamanoIndividual);

                const precioArmazon = precioTamanoIndividual + precioMarcaIndividual;
                //console.log(precioArmazon);
                const newArmazon = {
                    idMarca,
                    idTamano,
                    precioArmazon,
                    idFactura
                }

                conn.query('insert into armazon set ?', [newArmazon], (err, armazones) => {
                    res.redirect('/factura/' + idFactura);
                });
            });
        });
    });
}


const deleteArmazon = {};
deleteArmazon.deleteA = (req, res) => {
    const {idArmazon, idFactura} = req.body;
    req.getConnection((err, conn) => {
        conn.query('delete from armazon where idArmazon=?', [idArmazon], (err, rows) => {

            res.redirect('/factura/' + idFactura);

        })

    })


}


const agregarLuna = {};
agregarLuna.aggLuna = (req, res) => {
    const {idTipoluna, idFactura} = req.body;

    const dataLuna =
        {
            idTipoluna,
            idFactura
        };
    req.getConnection((err, conn) => {
        conn.query('insert into luna set ?', [dataLuna], (err, dataLuna) => {
            console.log(dataLuna);
            res.redirect('/factura/' + idFactura);
        });
    })
}


const deleteLuna = {};
deleteLuna.deleteLu = (req, res) => {
    const {idLuna, idFactura} = req.body;
    req.getConnection((err, conn) => {
        conn.query('delete from luna where idLuna=?', [idLuna], (err, rows) => {

            res.redirect('/factura/' + idFactura);

        })

    })


}
const cerrarFactura = {};
cerrarFactura.close = (req, res) => {
    const {idFactura, totalFactura} = req.body;
    req.getConnection((err, conn) => {
        conn.query('update factura set totalFactura=?,  idStatus=2 where idFactura=?', [totalFactura, idFactura], (err, rows) => {
            res.redirect('/factura/' + idFactura)
        })
    })
}





const listarFacturas={};
listarFacturas.list=(req, res)=>{
    req.getConnection((err, conn)=>{
        conn.query('select * from listFacturas', (err, listFacturas)=>{
            conn.query('select count(idFactura) as cantidad from listFacturas', (err, cantidad)=>{
                console.log(cantidad)
                res.render('facturas', {
                    listFacturas,
                    cantidad: cantidad[0]
                })
            })


        })
    })
}
const buscarFacturas={};
buscarFacturas.buscar=(req, res)=>{
    req.getConnection((err, conn)=>{
        console.log(req.body)
        res.render('facturas')
    })
}





module.exports = {
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
};

