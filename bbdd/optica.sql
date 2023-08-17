-- Elimina el esquema "optica" si existe
DROP SCHEMA IF EXISTS optica;

-- Crea el esquema "optica" si no existe
CREATE SCHEMA IF NOT EXISTS optica;

-- Usa el esquema "optica"
USE optica;

-- Creación de la tabla "cliente"
CREATE TABLE cliente (
                         idCliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         nombreCliente VARCHAR(100) NOT NULL,
                         cedulaCliente INT(10) NOT NULL
);

-- Creación de la tabla "marca"
CREATE TABLE marca (
                       idMarca INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                       nameMarca VARCHAR(100) NOT NULL
);

-- Creación de la tabla "tamano"
CREATE TABLE tamano (
                        idTamano INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        tamano FLOAT(4),
                        talla VARCHAR(2) NOT NULL,
                        precioIndividual FLOAT(5, 2) NOT NULL
);

-- Creación de la tabla "tipoluna"
CREATE TABLE tipoluna (
                          idTipoLuna INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                          nameTipoluna VARCHAR(50) NOT NULL,
                          precio FLOAT(5, 2) NOT NULL
);

-- Creación de la tabla "luna"
CREATE TABLE luna (
                      idLuna INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                      idTipoLuna INT NOT NULL,
                      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      name VARCHAR(50) DEFAULT "Luna",
                      FOREIGN KEY (idTipoLuna) REFERENCES tipoluna(idTipoLuna)
);

-- Creación de la tabla "lente"
CREATE TABLE lente (
                       idLente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                       idArmazon INT NOT NULL,
                       FOREIGN KEY (idArmazon) REFERENCES armazon(idArmazon)
);

-- Creación de la tabla "lente_luna"
CREATE TABLE lente_luna (
                            idLente INT NOT NULL,
                            idLuna INT NOT NULL,
                            FOREIGN KEY (idLente) REFERENCES lente(idLente),
                            FOREIGN KEY (idLuna) REFERENCES luna(idLuna)
);

-- Creación de la tabla "armazon"
CREATE TABLE armazon (
                         idArmazon INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                         precioArmazon FLOAT(6) NOT NULL,
                         idTamano INT NOT NULL,
                         idMarca INT NOT NULL,
                         fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         name VARCHAR(50) DEFAULT "Armazon",
                         idFactura INT NOT NULL,
                         FOREIGN KEY (idTamano) REFERENCES tamano(idTamano),
                         FOREIGN KEY (idMarca) REFERENCES marca(idMarca),
                         FOREIGN KEY (idFactura) REFERENCES factura(idFactura)
);

-- Creación de la tabla "lente_factura"
CREATE TABLE lente_factura (
                               idLente INT NOT NULL,
                               idFactura INT NOT NULL,
                               FOREIGN KEY (idLente) REFERENCES lente(idLente),
                               FOREIGN KEY (idFactura) REFERENCES factura(idFactura)
);

-- Creación de la tabla "factura"
CREATE TABLE factura (
                         idFactura INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         idCliente INT NOT NULL,
                         totalFactura FLOAT(6),
                         create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         idStatus INT NOT NULL DEFAULT 1,
                         FOREIGN KEY (idCliente) REFERENCES cliente(idCliente),
                         FOREIGN KEY (idStatus) REFERENCES statusFactura(idStatus)
);

-- Agregar columna "telefonoCliente" y "apellidoCliente" a la tabla "cliente"
ALTER TABLE cliente ADD COLUMN telefonoCliente INT(10) NOT NULL;
ALTER TABLE cliente ADD COLUMN apellidoCliente VARCHAR(60) NOT NULL;

-- Agregar columna "talla" y modificar columna "tamano" en la tabla "tamano"
ALTER TABLE tamano ADD COLUMN talla VARCHAR(2) NOT NULL;
ALTER TABLE tamano MODIFY COLUMN tamano VARCHAR(7) NOT NULL;

-- Agregar columna "precioIndividual" a las tablas "tamano" y "marca"
ALTER TABLE tamano ADD COLUMN precioIndividual FLOAT(5, 2) NOT NULL;
ALTER TABLE marca ADD COLUMN precioIndividual FLOAT(5, 2) NOT NULL;

-- Agregar columna "idFactura" y clave foránea a la tabla "armazon"
ALTER TABLE armazon ADD COLUMN idFactura INT NOT NULL;
ALTER TABLE armazon ADD CONSTRAINT fk_idFacturaArmazon FOREIGN KEY (idFactura) REFERENCES factura(idFactura);

-- Insertar datos en la tabla "tamano"
INSERT INTO tamano (tamano, talla, precioIndividual)
VALUES
    ("49-52mm", "CH", 20.2),
    ("53-56mm", "M", 22.50),
    ("57-58mm", "G", 26.35),
    ("59-63mm", "EG", 30.45);

-- Consulta para verificar los datos en la tabla "tamano"
SELECT * FROM tamano;

-- Insertar datos en la tabla "marca"
INSERT INTO marca (nameMarca, precioIndividual)
VALUES
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

-- Consulta para verificar los datos en la tabla "marca"
SELECT * FROM marca;

-- Agregar columna "precio" a la tabla "tipoluna"
ALTER TABLE tipoluna ADD COLUMN precio FLOAT(5, 2) NOT NULL;

-- Insertar datos en la tabla "tipoluna"
INSERT INTO tipoluna (nameTipoluna, precio)
VALUES
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

-- Agregar columna "fecha" y "name" a la tabla "armazon"
ALTER TABLE armazon ADD COLUMN fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE armazon ADD COLUMN name VARCHAR(50) DEFAULT "Armazon";

-- Consulta para verificar los datos en la tabla "armazon"
SELECT * FROM armazon;

-- Agregar columna "idFactura" y clave foránea a la tabla "luna"
ALTER TABLE luna ADD COLUMN idFactura INT NOT NULL;
ALTER TABLE luna ADD CONSTRAINT fk_ifFacturaLente FOREIGN KEY(idFactura) REFERENCES factura(idFactura);

-- Consulta para verificar los datos en la tabla "tipoluna"
SELECT * FROM tipoluna;

-- Consulta para verificar los datos en la tabla "tamano"
SELECT * FROM tamano;

-- Consulta para verificar los datos en la tabla "factura"
SELECT * FROM factura;

-- Consulta para verificar los datos en la tabla "cliente" con filtro por idCliente
SELECT * FROM cliente WHERE idCliente = 8;

-- Insertar datos en la tabla "factura" con múltiples valores
INSERT INTO factura (idCliente)
VALUES (8), (4);

-- Consulta para verificar los datos en la tabla "armazon" con filtro por idFactura
SELECT * FROM armazon WHERE idFactura = 13;

-- Consulta para verificar los datos en la tabla "armazon"
SELECT * FROM armazon;

-- Consulta para verificar los datos en la tabla "marca"
SELECT * FROM marca;

-- Crear una vista "datosArmazonFactura"
CREATE VIEW datosArmazonFactura AS
SELECT
    armazon.name,
    m.nameMarca,
    t.tamano,
    t.talla,
    armazon.precioArmazon,
    armazon.idFactura,
    armazon.idArmazon
FROM armazon
         INNER JOIN tamano t ON armazon.idTamano = t.idTamano
         INNER JOIN marca m ON armazon.idMarca = m.idMarca;

-- Consulta para verificar los datos en la vista "datosArmazonFactura"
SELECT * FROM datosArmazonFactura;

-- Agregar columna "name" a la tabla "luna"
ALTER TABLE luna ADD COLUMN name VARCHAR(50) DEFAULT "Luna";

-- Consulta para verificar los datos en la tabla "luna"
SELECT * FROM luna;

-- Agregar columna "create_at" a la tabla "factura" con valor por defecto
ALTER TABLE factura ADD COLUMN create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Crear una vista "datosLunaFactura"
CREATE VIEW datosLunaFactura AS
SELECT
    luna.idLuna,
    luna.name,
    t.precio,
    t.nameTipoluna,
    luna.idFactura
FROM luna
         INNER JOIN tipoluna t ON luna.idTipoLuna = t.idTipoLuna;

-- Consulta para verificar los datos en la vista "datosLunaFactura" con filtro por idFactura
SELECT * FROM datosLunaFactura WHERE idFactura = 13;

-- Crear la tabla "statusFactura"
CREATE TABLE statusFactura (
                               idStatus INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                               status VARCHAR(10) NOT NULL
);

-- Insertar datos en la tabla "statusFactura"
INSERT INTO statusFactura (status)
VALUES
    ("Abierta"),
    ("Cerrada");

-- Consulta para verificar los datos en la tabla "statusFactura"
SELECT * FROM statusFactura;

-- Agregar columna "idStatus" a la tabla "factura" con valor por defecto 1
ALTER TABLE factura ADD COLUMN idStatus INT NOT NULL DEFAULT 1;

-- Agregar clave foránea a la columna "idStatus" en la tabla "factura"
ALTER TABLE factura ADD CONSTRAINT fk_idFacturaStatus FOREIGN KEY (idStatus) REFERENCES statusFactura(idStatus);

-- Crear una vista "datosClienteFactura"
CREATE VIEW datosClienteFactura AS
SELECT
    c.nombreCliente,
    c.apellidoCliente,
    c.cedulaCliente,
    c.telefonoCliente,
    factura.idFactura,
    DATE_FORMAT(factura.create_at, "%d/%m/%Y") AS Fecha,
    factura.idStatus
FROM factura
         INNER JOIN cliente c ON factura.idCliente = c.idCliente;

-- Consulta para verificar los datos en la vista "datosClienteFactura" con filtro por idFactura
SELECT * FROM datosClienteFactura WHERE idFactura = 13;

-- Consulta para verificar los datos en la tabla "factura" con filtro por idFactura
SELECT * FROM factura WHERE idFactura = 21;

-- Consulta para verificar los datos en la tabla "cliente"
SELECT * FROM cliente;

-- Consulta para verificar los datos en la tabla "statusFactura"
SELECT * FROM statusFactura;

-- Consulta para verificar los datos en la tabla "factura" con filtro por idFactura
SELECT * FROM factura WHERE idFactura = 21;

-- Consulta para verificar los datos en la tabla "cliente"
SELECT * FROM cliente;

-- Consulta para verificar los datos en la tabla "tipoluna"
SELECT * FROM tipoluna;

-- Consulta para verificar los datos en la tabla "armazon"
SELECT * FROM armazon;

-- Consulta para verificar los datos en la tabla "luna"
SELECT * FROM luna;

-- Consulta para contar la cantidad de registros en la vista "listFacturas"
SELECT COUNT(idFactura) FROM listFacturas;

-- Consulta para verificar los datos en la tabla "armazon"
SELECT * FROM armazon;

-- Consulta para contar la cantidad de registros en la tabla "armazon" con filtro por fecha
SELECT COUNT(idArmazon) FROM armazon WHERE fecha BETWEEN "2023-08-08 15:40:24" AND "2023-08-08 15:40:24";

-- Consulta para contar la cantidad de registros en la tabla "luna" con filtro por fecha
SELECT COUNT(idLuna) FROM luna WHERE fecha BETWEEN "2023-08-08 15:40:24" AND "2023-08-08 15:40:24";

-- Consulta para contar la cantidad de registros en la tabla "luna" con filtro por fecha
SELECT COUNT(*) AS contador FROM luna WHERE fecha BETWEEN "2023-08-08 15:40:04" AND "2023-08-08 15:40:24";

-- Consulta para contar la cantidad de registros en la tabla "luna" con filtro por fecha
SELECT COUNT(idFactura) AS cantidad_registros FROM luna WHERE fecha BETWEEN "2023-08-08 00:00:00" AND "2023-08-08 23:59:00";

-- Consulta para contar la cantidad de registros en la tabla "armazon" con filtro por fecha
SELECT COUNT(idArmazon) FROM armazon WHERE fecha BETWEEN "2023-08-08 00:00:00" AND "2023-08-08 23:59:00";

-- Consulta para verificar los datos en la tabla "luna"
SELECT * FROM luna;

-- Consulta para verificar los datos en la vista "listFacturas" con filtro por fecha
SELECT * FROM listFacturas WHERE Fecha BETWEEN "2023-08-08" AND "2023-08-08";

-- Eliminar datos de las tablas "factura", "armazon" y "luna"
DELETE FROM factura;
DELETE FROM armazon;
DELETE FROM luna;

-- Consulta para verificar los datos en la tabla "factura"
SELECT * FROM factura;
