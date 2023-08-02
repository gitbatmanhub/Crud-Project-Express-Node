drop schema if exists optica;

create schema if not exists optica;


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
alter table tipoLuna add column precio float(5,2) not null;


insert into tipoluna(nameTipoluna, precio)
values
    ("Monofocales", 100),
    ("Progresivas", 100),
    ("Bifocales", 100),
    ("Fotocromáticas", 100),
    ("Polarizadas", 100),
    ("Antirreflejo", 100),
    ("Trivex", 100),
    ("Policarbonato", 100),
    ("High-Index", 100),
    ("Asféricas", 100),
    ("Blue Block", 100),
    ("Lunas de lectura", 100),
    ("Lunas de pantalla", 100),
    ("Lunas de descanso", 100),
    ("Lunas deportivas", 100);



alter table armazon add column name varchar(50) default "Armazon";
select * from armazon;
alter table luna add column idFactura int not null;
alter table luna add constraint fk_ifFacturaLente foreign key(idFactura) references factura(idFactura);
select * from tipoluna;
select * from tamano;

select * from factura;
select * from cliente where idCliente=8;
insert into factura (idCliente)
values (8),
       (4);

select * from armazon where idFactura=13;
select * from armazon;
select * from marca;

create view datosArmazonFactura as
select armazon.name,
       m.nameMarca,
       t.tamano,
       t.talla,
       armazon.precioArmazon,
       armazon.idFactura,
       armazon.idArmazon
from armazon
         inner join tamano t on armazon.idTamano = t.idTamano
         inner join marca m on armazon.idMarca = m.idMarca ;
select * from armazon;

alter table luna add column name varchar(50) default "Luna";
select * from luna;
alter table factura add column create_at timestamp default current_timestamp;

create view datosLunaFactura as
select luna.idLuna, luna.name, t.precio, t.nameTipoluna, luna.idFactura
from luna
         inner join tipoluna t on luna.idTipoLuna = t.idTipoLuna;

select * from datosLunaFactura where idFactura=13;
create table statusFactura(
                              idStatus int not null primary key auto_increment,
                              status varchar(10) not null
);


insert into statusFactura(status)
values ("Abierta"),
       ("Cerrada");
select * from statusFactura;
alter table factura add column idStatus int not null default 1;
alter table factura add constraint fk_idFacturaStatus foreign key (idStatus) references statusFactura(idStatus);

create view datosClienteFactura as
select c.nombreCliente,
       c.apellidoCliente,
       c.cedulaCliente,
       c.telefonoCliente,
       factura.idFactura,
       date_format(factura.create_at, "%d/%m/%Y") as Fecha,
       factura.idStatus
from factura
         inner join cliente c on factura.idCliente = c.idCliente;
select * from datosClienteFactura where idFactura=13;




select * from factura where idFactura=21;
select * from cliente;

select * from statusFactura;


select * from factura where idFactura=21;
select * from cliente;


select * from tipoluna;
select * from marca;
select * from marca;
select * from tamano;

select * from cliente;
select * from factura;
select * from statusFactura;

#DROP VIEW listFacturas;
create view listFacturas as
select f.idFactura,
       sF.status,
       date_format(f.create_at, "%d/%m/%Y") as Fecha ,
       CONCAT(c.nombreCliente, ' ', apellidoCliente) AS nombreCliente
from factura f
         inner join statusFactura sF on f.idStatus =sF.idStatus
         inner join cliente c on f.idCliente = c.idCliente;
select * from listFacturas;
select * from cliente;


select * from tipoLuna;




