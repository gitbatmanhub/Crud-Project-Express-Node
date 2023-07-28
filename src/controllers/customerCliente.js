
const listClientesController={};
listClientesController.list= (req, res)=>{
  req.getConnection((err, conn)=>{
    conn.query('select * from cliente', (err, cliente)=>{
      if(err){
        res.json(err)
      }
      //console.log(cliente)
      res.render('clientes', {
        data: cliente
      })
    })
  })
};

const clienteController={};
clienteController.save=(req, res)=>{
  const data= req.body;
  req.getConnection((err, conn)=>{
    conn.query('INSERT INTO cliente set ?', [data], (err, cliente)=>{
      //console.log(err)
      res.redirect('/');
    })
  })
}

const addLente={};
addLente.aggLe=(req, res)=>{
  const datalente=req.body;
  req.getConnection((err, conn)=>{
    conn.query('insert into marca set ?', [datalente], (err, marca)=>{
      //console.log(err);
      res.redirect('/');
    })
  })
}


const addLuna={};
addLuna.aggLu=(req, res)=>{
  const dataLuna = req.body;
  req.getConnection((err, conn)=>{
    conn.query('insert into tipoluna set ?', [dataLuna], (err, marca)=>{
      //console.log(err);
      res.redirect('/');
    })
  })
}



const facturas = {};
facturas.crear = (req, res) => {
    const idFactura = req.params;
    //console.log(idFactura)

    // Hacer una consulta a la tabla marca
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM marca', (err, marcas) => {
            //console.log(marcas);

            // Hacer una consulta a la tabla tamaño
            conn.query('SELECT * FROM tamano', (err, tamanos) => {
                //console.log(tamaños);

                // Renderizar los resultados en la vista factura
                res.render('factura', {
                    idFactura: idFactura,
                    marcas: marcas,
                    tamanos: tamanos
                });
            });
        });
    });
};

module.exports = facturas;


module.exports = facturas;





const crearFactura={};
crearFactura.make=(req, res)=>{
  const idCliente=req.body;
  console.log(idCliente);
  req.getConnection((err, conn)=>{
    conn.query('insert into factura set ?', [idCliente], (err, facturas)=>{
      const idFactura=facturas.insertId;
      res.redirect('/factura/'+idFactura);

    })

  })
}

module.exports= {
  listClientesController,
  clienteController,
  addLente,
  addLuna,
  facturas,
  crearFactura
};