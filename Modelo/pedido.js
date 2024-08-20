import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
    #codigo;
    #descricao;
    #valorTotal;
    #dataPedido;
    #clienteId; // Relacionamento com Cliente

    constructor(codigo = 0, descricao = "", valorTotal = 0, dataPedido = '', clienteId = 0) {
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#valorTotal = valorTotal;
        this.#dataPedido = dataPedido;
        this.#clienteId = clienteId;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    get valorTotal() {
        return this.#valorTotal;
    }

    set valorTotal(novoValor) {
        this.#valorTotal = novoValor;
    }

    get dataPedido() {
        return this.#dataPedido;
    }

    set dataPedido(novaData) {
        this.#dataPedido = novaData;
    }

    get clienteId() {
        return this.#clienteId;
    }

    set clienteId(novoClienteId) {
        this.#clienteId = novoClienteId;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao,
            valorTotal: this.#valorTotal,
            dataPedido: this.#dataPedido,
            clienteId: this.#clienteId
        };
    }

    async gravar() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.gravar(this);
    }

    async excluir() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.excluir(this);
    }

    async atualizar() {
        const pedidoDAO = new PedidoDAO();
        await pedidoDAO.atualizar(this);
    }

    async consultar(termo) {
        const pedidoDAO = new PedidoDAO();
        return await pedidoDAO.consultar(termo);
    }
}
