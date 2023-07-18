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



("Hola", 1),
("Hola", 2),
("Hola", 3),
("Hola", 4),
("Hola", 5),
("Hola", 6),
("Hola", 7),
("Hola", 8),
("Hola", 9),
("Hola", 10),
("Hola", 11),
("Hola", 12),
("Hola", 13),
("Hola", 14),
("Hola", 15),
("Hola", 16),
("Hola", 17),
("Hola", 18);