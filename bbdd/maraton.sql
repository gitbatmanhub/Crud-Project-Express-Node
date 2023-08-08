create schema maraton;

use maraton;



create table entrada
(
    idEntrada     int         not null primary key auto_increment,
    idCategoria   int         not null,
    idTipoCarrera int         not null,
    idFactura     int         not null,
    precioEntrada float(5, 2) not null
);



create table factura
(
    idFactura int not null primary key auto_increment,
    idCliente int not null
);

create table cliente
(
    idCliente       int         not null primary key auto_increment,
    nameCliente     varchar(50) not null,
    apellidoCliente varchar(50) not null,
    cedulaCliente   int         not null
);

create table categoria
(
    idCategoria     int          not null primary key auto_increment,
    nameCategoria   varchar(100) not null,
    precioCategoria float(5, 2)  not null
);


create table tipoCarrera
(
    idTipoCarrera     int          not null primary key auto_increment,
    nameTipoCarrera   varchar(100) not null,
    precioTipoCarrera float(5, 2)  not null
);


alter table factura
    add constraint fk_idClienteFactura foreign key (idCliente) references cliente (idCliente);
alter table entrada
    add constraint fk_idENtradaCategoria foreign key (idCategoria) references categoria (idCategoria);
alter table entrada
    add constraint fk_idEntradaTipoCarrera foreign key (idTipoCarrera) references tipoCarrera (idTipoCarrera);
alter table entrada
    add constraint fk_idEntradaFactura foreign key (idFactura) references factura (idFactura);
alter table entrada
    add column fechaHora timestamp default current_timestamp;



alter table factura
    add column fecha timestamp default current_timestamp;
alter table factura
    add column totalFactura float(5, 2) not null default 00.00;
insert into categoria (nameCategoria, precioCategoria)
values ("Normal", 120.12),
       ("Senior", 150.25),
       ("Discapacitados", 100),
       ("Tercera Edad", 152);


insert into tipoCarrera (nameTipoCarrera, precioTipoCarrera)
values ("5k", 20),
       ("10k", 25),
       ("22k", 50);


drop view datosEntradasfactura;
create view datosEntradasfactura as
select e.idEntrada,
       e.idFactura,
       c.nameCategoria,
       tC.nameTipoCarrera,
       e.precioEntrada,
       date_format(e.fechaHora, "%d/%m/%Y") as Fecha
from entrada e
         inner join categoria c on e.idCategoria = c.idCategoria
         inner join tipoCarrera tC on e.idTipoCarrera = tC.idTipoCarrera
;


use maraton;
select *
from entrada;

select *
from datosEntradasfactura;
alter table factura
    drop constraint fk_facturaEstado;
alter table factura
    drop column estadoFactura;
alter table factura
    add column estadoFactura int not null default 2;
create table estado
(
    idEstado   int         not null auto_increment primary key,
    nameEstado varchar(50) not null
);


insert into estado (nameEstado)
values ("Procesado"),
       ("No procesado");

alter table factura
    add constraint fk_facturaEstado foreign key (estadoFactura) references estado (idEstado);
select *
from factura;
select *
from estado;
create view datosCliente as
select c.*, f.estadoFactura, e.nameEstado
from factura f
         inner join cliente c on f.idCliente = c.idCliente
         inner join estado e on f.estadoFactura = e.idEstado;

select *
from datosEntradasfactura;


create view datosFacturaCliente as
select f.idFactura,
       c.idCliente,
       concat(c.nameCliente, ' ', c.apellidoCliente) as nameCompleto,
       c.cedulaCliente,
       f.estadoFactura,
       e.nameEstado
from factura f
         inner join cliente c on f.idCliente = c.idCliente
         inner join estado e on f.estadoFactura = e.idEstado;



select *
from datosFacturaCliente;

select *
from factura
where idFactura = 1;

update factura
set factura.estadoFactura=2
where idFactura = 2;
select *
from factura
where idFactura = 2;

drop view todasFacturas;

create view todasFacturas as
select f.idFactura,
       concat(c.nameCliente, ' ', c.apellidoCliente) as nombreCliente,
       e.nameEstado,
       f.totalFactura,
       date_format(f.fecha, "%Y-%m-%d")              as Fecha,
       date_format(f.fecha, "%h:%m")                 as Hora

from factura f
         inner join cliente c on f.idCliente = c.idCliente
         inner join estado e on f.estadoFactura = e.idEstado;

select *
from factura
where fecha
          between "2023-08-07 12:25:43"
          and "2023-08-07 12:25:43";
select *
from todasFacturas;
-- Facturas dentro del tiempo
select *
from todasFacturas
where Fecha between "07-08-2023" and "07-08-2023";
-- Contar la cantidad de facturas en x tiempo
select *
from todasFacturas;
select count(idFactura)
from todasFacturas
where Fecha between "2023-08-07" and "2023-08-07";
-- Nr de Entradas vendidas en x lapso de tiempo
select *
from entrada;

select count(idEntrada) from entrada where fechaHora between "2023-08-07 12:39:34" and "2023-08-07 12:39:34";

select *
from entrada;

select count(idEntrada) as contador from entrada where fechaHora between "2023-08-07 12:39:34" and "2023-08-08 23:59:34";

select *
from todasFacturas
where Fecha between '2023-08-07' and '2023-08-07';