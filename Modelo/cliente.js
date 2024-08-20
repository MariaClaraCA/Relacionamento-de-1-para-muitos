import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    #codigo;
    #nome;

    constructor(codigo = 0, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    toJSON() {
        return {
            clienteId: this.#codigo,
            nome: this.#nome
        };
    }

    async gravar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async atualizar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.atualizar(this);
    }

    async consultar(parametro) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(parametro);
    }
}
