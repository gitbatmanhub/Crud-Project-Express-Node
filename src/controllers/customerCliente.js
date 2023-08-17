// Importamos la función 'query' de 'express' para trabajar con consultas SQL
const { query } = require("express");

// Objeto para el controlador de listado de clientes
const listClientesController = {};


listClientesController.list = (req, res) => {
    req.getConnection((err, conn) => {
        // Realizamos una consulta SQL para obtener los nombres y IDs de los clientes
        conn.query('SELECT CONCAT(nombreCliente, \' \', apellidoCliente) AS nombreCliente, idCliente FROM cliente;', (err, cliente) => {
            if (err) {
                res.json(err);
            }
            // Renderizamos la vista 'clientes' y pasamos los datos obtenidos de la consulta
            res.render('clientes', {
                data: cliente
            });
        });
    });
};

// Objeto para el controlador de cliente
const clienteController = {};


clienteController.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        // Insertamos los datos del cliente en la base de datos
        conn.query('INSERT INTO cliente set ?', [data], (err, cliente) => {
            //console.log(err)
            res.redirect('/');
        });
    });
}

// Objeto para agregar una marca de lente
const addLente = {};


addLente.aggLe = (req, res) => {
    const { nameMarca, precio } = req.body;
    const datalente = {
        nameMarca,
        precioIndividual: precio
    }
    req.getConnection((err, conn) => {
        // Insertamos los datos de la marca de lente en la base de datos
        conn.query('insert into marca set ?', [datalente], (err, marca) => {
            console.log(err);
            res.redirect('/');
        });
    });
}

// Objeto para agregar un tipo de luna
const addLuna = {};


addLuna.aggLu = (req, res) => {
    const { nameTipoluna, precio } = req.body;
    const dataLuna = {
        nameTipoluna,
        precio
    };
    req.getConnection((err, conn) => {
        // Insertamos los datos del tipo de luna en la base de datos
        conn.query('insert into tipoluna set ?', [dataLuna], (err, marca) => {
            //console.log(err);
            res.redirect('/');
        });
    });
}

// Objeto para el controlador de facturas
const facturas = {};

facturas.crear = (req, res) => {
    const idFactura = req.params;
    // Hacer una consulta a la tabla marca
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM marca', (err, marcas) => {
            // Hacer una consulta a la tabla tamaño
            conn.query('SELECT * FROM tamano', (err, tamanos) => {
                conn.query('SELECT * from datosArmazonFactura where idFactura=?', [idFactura.id], (err, armazon) => {
                    const Armazon = armazon;
                    conn.query('SELECT * from tipoluna', (err, tipoluna) => {
                        conn.query('SELECT * FROM datosLunaFactura WHERE idFactura=?', [idFactura.id], (err, luna) => {
                            console.log(luna)
                            conn.query('select * from datosClienteFactura where idFactura=?', [idFactura.id], (err, datos) => {
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
// Objeto para crear una factura
const crearFactura = {};


crearFactura.make = (req, res) => {
    const idCliente = req.body;
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

            // Redirigir a la página de la factura recién creada
            res.redirect('/factura/' + lastInsertedId);
        });
    });
};

// Objeto para agregar un armazón a la factura
const aggArmazonFactura = {};


aggArmazonFactura.aggAF = (req, res) => {
    const { idMarca, idTamano, idFactura } = req.body;
    const newArmazon = { idMarca, idTamano, idFactura };

    req.getConnection((err, conn) => {
        // Consultar información de la marca seleccionada
        conn.query('SELECT * FROM marca where idMarca=?', [idMarca], (err, marcas) => {
            const precioMarcaIndividual = marcas[0].precioIndividual;

            // Consultar información del tamaño seleccionado
            conn.query('SELECT * FROM tamano where idTamano=?', [idTamano], (err, tamanos) => {
                const precioTamanoIndividual = tamanos[0].precioIndividual;
                const precioArmazon = precioTamanoIndividual + precioMarcaIndividual;
                const newArmazon = {
                    idMarca,
                    idTamano,
                    precioArmazon,
                    idFactura
                }

                // Insertar los datos del armazón en la base de datos
                conn.query('insert into armazon set ?', [newArmazon], (err, armazones) => {
                    res.redirect('/factura/' + idFactura);
                });
            });
        });
    });
};

// Objeto para eliminar un armazón de la factura
const deleteArmazon = {};


deleteArmazon.deleteA = (req, res) => {
    const { idArmazon, idFactura } = req.body;
    req.getConnection((err, conn) => {
        // Eliminar el armazón de la base de datos
        conn.query('delete from armazon where idArmazon=?', [idArmazon], (err, rows) => {
            // Redirigir de regreso a la página de la factura
            res.redirect('/factura/' + idFactura);
        });
    });
};

// Objeto para agregar una luna a la factura
const agregarLuna = {};


agregarLuna.aggLuna = (req, res) => {
    const { idTipoluna, idFactura } = req.body;

    const dataLuna = {
        idTipoluna,
        idFactura
    };
    req.getConnection((err, conn) => {
        // Insertar los datos de la luna en la base de datos
        conn.query('insert into luna set ?', [dataLuna], (err, dataLuna) => {
            console.log(dataLuna);
            // Redirigir de regreso a la página de la factura
            res.redirect('/factura/' + idFactura);
        });
    });
};

// Objeto para eliminar una luna de la factura
const deleteLuna = {};

deleteLuna.deleteLu = (req, res) => {
    const { idLuna, idFactura } = req.body;
    req.getConnection((err, conn) => {
        // Eliminar la luna de la base de datos
        conn.query('delete from luna where idLuna=?', [idLuna], (err, rows) => {
            // Redirigir de regreso a la página de la factura
            res.redirect('/factura/' + idFactura);
        });
    });
};

// Objeto para cerrar una factura
const cerrarFactura = {};


cerrarFactura.close = (req, res) => {
    const { idFactura, totalFactura } = req.body;
    req.getConnection((err, conn) => {
        // Actualizar el total de la factura y el estado de la factura
        conn.query('update factura set totalFactura=?, idStatus=2 where idFactura=?', [totalFactura, idFactura], (err, rows) => {
            // Redirigir de regreso a la página de la factura
            res.redirect('/factura/' + idFactura);
        });
    });
};

// Objeto para listar facturas
const listarFacturas = {};

listarFacturas.list = (req, res) => {
    req.getConnection((err, conn) => {
        // Obtener todas las facturas y la cantidad total de facturas
        conn.query('select * from listFacturas', (err, listFacturas) => {
            conn.query('select count(idFactura) as cantidad from listFacturas', (err, cantidad) => {
                conn.query('SELECT COUNT(idFactura) AS cantidadLunas FROM luna;', (err, cantidadLunas) => {
                    conn.query('SELECT COUNT(idFactura) AS cantidadArmazon FROM armazon;', (err, cantidadArmazon) => {
                        // Renderizar la vista 'facturas' con los datos obtenidos
                        res.render('facturas', {
                            listFacturas,
                            cantidad: cantidad[0],
                            cantidadLunas: cantidadLunas[0],
                            cantidadArmazon: cantidadArmazon[0]
                        });
                    });
                });
            });
        });
    });
};

// Objeto para buscar facturas por fecha
const buscarFacturas = {};


buscarFacturas.buscar = (req, res) => {
    req.getConnection((err, conn) => {
        const { fecha1, fecha2 } = req.body;
        Fecha1H = fecha1 + ' 00:00:00';
        Fecha2H = fecha2 + ' 23:59:00';
        conn.query('select * from listFacturas where Fecha between ? and ?', [fecha1, fecha2], (err, listFacturas) => {
            conn.query('select count(idFactura) as cantidad from listFacturas  where Fecha between ? and ?', [fecha1, fecha2], (err, cantidad) => {
                conn.query('SELECT COUNT(idFactura) AS cantidadLunas FROM luna  where Fecha between ? and ?', [Fecha1H, Fecha2H], (err, cantidadLunas) => {
                    conn.query('SELECT COUNT(idFactura) AS cantidadArmazon FROM armazon where Fecha between ? and ?', [Fecha1H, Fecha2H], (err, cantidadArmazon) => {
                        // Renderizar la vista 'facturas' con los datos obtenidos
                        res.render('facturas', {
                            listFacturas,
                            cantidad: cantidad[0],
                            cantidadLunas: cantidadLunas[0],
                            cantidadArmazon: cantidadArmazon[0]
                        });
                    });
                });
            });
        });
    });
};

// Exportar todos los controladores como un objeto
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
