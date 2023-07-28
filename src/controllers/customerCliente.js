
const listClientesController={};
listClientesController.list= (req, res)=>{
  req.getConnection((err, conn)=>{
    conn.query('select * from armazon', (err, cliente)=>{
      if(err){
        res.json(err)
      }
      console.log(cliente)
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
      console.log(err)
      res.redirect('/');
    })
  })
}




module.exports= {
  listClientesController,
  clienteController
};