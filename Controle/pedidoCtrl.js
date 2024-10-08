import Pedido from "../Modelo/pedido.js";

export default class PedidoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const valorTotal = dados.valorTotal;
            const dataPedido = dados.dataPedido;
            const clienteId = dados.clienteId;

            if (descricao && valorTotal > 0 && dataPedido && clienteId) {
                const pedido = new Pedido(0, descricao, valorTotal, dataPedido, clienteId);
                pedido.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": pedido.codigo,
                        "mensagem": "Pedido incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o pedido: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do pedido conforme a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um pedido!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const valorTotal = dados.valorTotal;
            const dataPedido = dados.dataPedido;
            const clienteId = dados.clienteId;

            if (codigo && descricao && valorTotal > 0 && dataPedido && clienteId) {
                const pedido = new Pedido(codigo, descricao, valorTotal, dataPedido, clienteId);
                pedido.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Pedido atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o pedido: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do pedido conforme a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um pedido!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const pedido = new Pedido(codigo);
                pedido.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Pedido excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o pedido: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do pedido!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um pedido!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo || '';
        if (requisicao.method === "GET") {
            const pedido = new Pedido();
            pedido.consultar(termo).then((listaPedidos) => {
                resposta.json({
                    status: true,
                    listaPedidos
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter os pedidos: " + erro.message
                    });
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar pedidos!"
            });
        }
    }
}
