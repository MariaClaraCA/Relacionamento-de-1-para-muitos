import Pedido from "../Modelo/pedido.js";
import conectar from "./conexao.js";

export default class PedidoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS pedido(
                    ped_codigo INT NOT NULL AUTO_INCREMENT,
                    ped_descricao VARCHAR(100) NOT NULL,
                    ped_valorTotal DECIMAL(10,2) NOT NULL DEFAULT 0,
                    ped_dataPedido DATE,
                    cli_codigo INT NOT NULL,
                    CONSTRAINT pk_pedido PRIMARY KEY(ped_codigo),
                    CONSTRAINT fk_cliente FOREIGN KEY(cli_codigo) REFERENCES cliente(cli_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(pedido) {
        if (pedido instanceof Pedido) {
            const sql = `INSERT INTO pedido(ped_descricao, ped_valorTotal, ped_dataPedido, cli_codigo)
                         VALUES(?,?,?,?)`;
            const parametros = [pedido.descricao, pedido.valorTotal, pedido.dataPedido, pedido.clienteId];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            pedido.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(pedido) {
        if (pedido instanceof Pedido) {
            const sql = `UPDATE pedido SET ped_descricao = ?, ped_valorTotal = ?,
                         ped_dataPedido = ?, cli_codigo = ? WHERE ped_codigo = ?`;
            const parametros = [pedido.descricao, pedido.valorTotal, pedido.dataPedido, pedido.clienteId, pedido.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(pedido) {
        if (pedido instanceof Pedido) {
            const sql = `DELETE FROM pedido WHERE ped_codigo = ?`;
            const parametros = [pedido.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let listaPedidos = [];

        if (!isNaN(parseInt(termo))) {
            const sql = `SELECT * FROM pedido WHERE ped_codigo = ? ORDER BY ped_descricao`;
            const parametros = [termo];
            const [registros] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const pedido = new Pedido(
                    registro.ped_codigo,
                    registro.ped_descricao,
                    registro.ped_valorTotal,
                    registro.ped_dataPedido,
                    registro.cli_codigo
                );
                listaPedidos.push(pedido);
            }
        } else {
            const sql = `SELECT * FROM pedido WHERE ped_descricao LIKE ? ORDER BY ped_descricao`;
            const parametros = ['%' + termo + '%'];
            const [registros] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const pedido = new Pedido(
                    registro.ped_codigo,
                    registro.ped_descricao,
                    registro.ped_valorTotal,
                    registro.ped_dataPedido,
                    registro.cli_codigo
                );
                listaPedidos.push(pedido);
            }
        }

        return listaPedidos;
    }
}
