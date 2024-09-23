import React, { useState, useEffect } from 'react';
import BuscaCliente from './BuscaCliente';
import AlunoService from '../services/AlunoService';

const CadastroPedido = ({ pedidoSelecionado, onPedidoCadastrado }) => {
  const [descricao, setDescricao] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [dataPedido, setDataPedido] = useState('');
  const [cliente, setCliente] = useState(null);  // Armazena o cliente selecionado
  const [isEditando, setIsEditando] = useState(false);  // Verifica se estamos editando ou cadastrando

  // Quando um pedido for selecionado para edição, preenche os campos do formulário
  useEffect(() => {
    if (pedidoSelecionado) {
      setDescricao(pedidoSelecionado.descricao);
      setValorTotal(pedidoSelecionado.valorTotal);
      setDataPedido(pedidoSelecionado.dataPedido);
      setCliente({ clienteId: pedidoSelecionado.clienteId });
      setIsEditando(true);
    } else {
      resetForm();
    }
  }, [pedidoSelecionado]);

  const resetForm = () => {
    setDescricao('');
    setValorTotal('');
    setDataPedido('');
    setCliente(null);
    setIsEditando(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica se o cliente está sendo corretamente selecionado
    console.log('Cliente selecionado:', cliente);

    // Verifica se todos os campos estão preenchidos
    if (!descricao || !valorTotal || !dataPedido || !cliente) {
      alert('Preencha todos os campos!');
      return;
    }

    const pedido = {
      descricao,
      valorTotal,
      dataPedido,
      clienteId: cliente?.clienteId || null,  // Verifica se o cliente tem clienteId
    };

    if (isEditando) {
      // Atualiza o pedido
      AlunoService.atualizarPedido({ ...pedido, codigo: pedidoSelecionado.codigo })
        .then((response) => {
          alert('Pedido atualizado com sucesso!');
          resetForm();
          onPedidoCadastrado();  // Atualiza a lista de pedidos no componente pai
        })
        .catch((error) => {
          alert('Erro ao atualizar o pedido: ' + error.message);
        });
    } else {
      // Cadastra um novo pedido
      AlunoService.gravarPedido(pedido)
        .then((response) => {
          alert('Pedido cadastrado com sucesso!');
          resetForm();
          onPedidoCadastrado();  // Atualiza a lista de pedidos no componente pai
        })
        .catch((error) => {
          alert('Erro ao cadastrar o pedido: ' + error.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isEditando ? 'Editar Pedido' : 'Cadastro de Pedido'}</h1>
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição do pedido"
      />
      <input
        type="number"
        value={valorTotal}
        onChange={(e) => setValorTotal(e.target.value)}
        placeholder="Valor total"
      />
      <input
        type="date"
        value={dataPedido}
        onChange={(e) => setDataPedido(e.target.value)}
      />

      {/* Componente de busca de cliente */}
      <BuscaCliente onClienteSelecionado={setCliente} />

      {/* Exibe o cliente selecionado para confirmação */}
      {cliente && <p>Cliente selecionado: {cliente.nome}</p>}
      
      <button type="submit">{isEditando ? 'Atualizar Pedido' : 'Cadastrar Pedido'}</button>
      {isEditando && <button type="button" onClick={resetForm}>Cancelar Edição</button>}
    </form>
  );
};

export default CadastroPedido;
