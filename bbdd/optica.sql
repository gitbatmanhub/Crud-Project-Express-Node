create schema if not exists optica ;


use optica;


create table cliente(
                        idCliente int not null auto_increment primary key ,
                        nombreCliente varchar(100) not null ,
                        cedulaCliente int(10) not null
);


create table marca(
                      idMarca int not null primary key auto_increment,
                      nameMarca varchar(100) not null
);
create table tamano(
                       idTamano int not null PRIMARY KEY AUTO_INCREMENT,
                       tamano float(4)
);
create table tipoluna(
                         idTipoLuna int not null primary key auto_increment,
                         nameTipoluna varchar(50) not null
);
create table luna(
                     idLuna int not null primary key auto_increment,
                     idTipoLuna int not null
);
alter table luna add constraint fk_idLunaTipoLuna foreign key (idTipoLuna) references tipoluna(idTipoLuna);

create table lente(
                      idLente int not null auto_increment primary key,
                      idArmazon int not null
);


create table lente_luna(
                           idLente int not null,
                           idLuna int not null
);

alter table lente_luna add constraint fk_lente foreign key (idLente) references lente(idLente);
alter table lente_luna add constraint fk_luna foreign key (idLuna) references luna(idLuna);

create table armazon(
                        idArmazon int not null primary key auto_increment,
                        precioArmazon float(6) not null,
                        idTamano int not null,
                        idMarca int not null
);



alter table armazon add column idFactura
alter table armazon add constraint fk_armazonTamano foreign key (idTamano) references tamano(idTamano);
alter table armazon add constraint fk_armazonMarca foreign key (idMarca) references marca(idMarca);


alter table lente add constraint fk_idArmazonLente foreign key (idArmazon) references armazon(idArmazon);



create table lente_factura(
                              idLente int not null,
                              idFactura int not null
);


create table factura(
                        idFactura int not null auto_increment primary key,
                        idCliente int not null ,
                        totalFactura float(6)
);

alter table lente_factura add constraint fk_idLente foreign key (idLente) references lente(idLente);

alter table lente_factura add constraint fk_idFactura foreign key (idFactura) references factura(idfactura);

alter table lente add constraint fk_idArmazon foreign key (idArmazon) references armazon(idArmazon);



alter table factura add constraint fk_idCliente foreign key (idCliente) references cliente(idCliente);



alter table cliente add column telefonoCliente int(10) not null;
alter table cliente add column apellidoCliente varchar(60) not null;
alter table tamano add column talla varchar(2) not null ;
alter table tamano modify column tamano varchar(7) not null ;

alter table tamano add column precioIndividual float (5,2) not null ;

alter table marca add column precioIndividual float(5,2) not null ;

alter table armazon add column idFactura int not null ;
alter table armazon add constraint fk_idFacturaArmazon foreign key (idFactura) references factura(idFactura);

insert into tamano ( tamano, talla, precioIndividual)
values ("49-52mm", "CH", 20.2),
       ("53-56mm", "M", 22.50),
       ("57-58mm", "G", 26.35),
       ("59-63mm", "EG", 30.45);


select * from tamano;

insert into marca(nameMarca, precioIndividual)
values
    ("Ray-Ban", 200.20),
    ("Oakley", 150.64),
    ("Prada", 154.65),
    ("Gucci", 169.99),
    ("Versace", 180.90),
    ("Tom Ford", 300),
    ("Dior", 160),
    ("Fendi", 140),
    ("Chanel", 130),
    ("Burberry", 180),
    ("Armani", 120),
    ("Michael Kors", 150.65),
    ("Coach", 167),
    ("Calvin Klein", 185),
    ("Ralph Lauren", 300);

select * from marca;
describe marca;


insert into tipoluna(nameTipoluna)
values
    ("Monofocales"),
    ("Progresivas"),
    ("Bifocales"),
    ("Fotocromáticas"),
    ("Polarizadas"),
    ("Antirreflejo"),
    ("Trivex"),
    ("Policarbonato"),
    ("High-Index"),
    ("Asféricas"),
    ("Blue Block"),
    ("Lunas de lectura"),
    ("Lunas de pantalla"),
    ("Lunas de descanso"),
    ("Lunas deportivas");


select * from tipoluna;
select * from tamano;

select * from factura;
select * from cliente where idCliente=8;
insert into factura (idCliente)
values (8),
       (4);