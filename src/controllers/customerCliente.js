const listClientesController = {};
listClientesController.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from cliente', (err, cliente) => {
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
    const datalente = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into marca set ?', [datalente], (err, marca) => {
            //console.log(err);
            res.redirect('/');
        })
    })
}


const addLuna = {};
addLuna.aggLu = (req, res) => {
    const dataLuna = req.body;
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


                            // Renderizar los resultados en la vista factura
                            res.render('factura', {
                                idFactura: idFactura,
                                marcas: marcas,
                                tamanos: tamanos,
                                armazon: armazon,
                                tipoluna: tipoluna,
                                luna: luna

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
        conn.query('insert into factura set ?', [idCliente], (err, facturas) => {
            const idFactura = facturas.insertId;
            res.redirect('/factura/' + idFactura);

        })

    })
}

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
            console.log(err)
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
    deleteLuna
};