CREATE DATABASE padaria;

USE padaria;

CREATE TABLE cliente (
    cli_codigo INT NOT NULL AUTO_INCREMENT,
    cli_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
);

CREATE TABLE pedido (
    ped_codigo INT NOT NULL AUTO_INCREMENT,
    ped_descricao VARCHAR(100) NOT NULL,
    ped_valorTotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    ped_dataPedido DATE,
    cli_codigo INT NOT NULL,
    CONSTRAINT pk_pedido PRIMARY KEY(ped_codigo),
    CONSTRAINT fk_cliente FOREIGN KEY (cli_codigo) REFERENCES cliente(cli_codigo)
);
