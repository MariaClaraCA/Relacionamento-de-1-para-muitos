import Cliente from "../Modelo/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    cli_codigo INT NOT NULL AUTO_INCREMENT,
                    cli_nome VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "INSERT INTO cliente(cli_nome) VALUES(?)";
            const parametros = [cliente.nome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cliente.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "UPDATE cliente SET cli_nome = ? WHERE cli_codigo = ?";
            const parametros = [cliente.nome, cliente.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "DELETE FROM cliente WHERE cli_codigo = ?";
            const parametros = [cliente.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM cliente WHERE cli_codigo = ? ORDER BY cli_nome';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM cliente WHERE cli_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const registro of registros) {
            const cliente = new Cliente(registro.cli_codigo, registro.cli_nome);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}
