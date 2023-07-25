const controller = {};


controller.list= (req, res)=>{
  req.getConnection((err, conn)=>{
    conn.query('select * from previs', (err, previs)=>{
      if(err){
        res.json(err)
      }
      console.log(previs)
      res.render('clientes', {
        data: previs
      })
    })
  })
};






module.exports=controller;