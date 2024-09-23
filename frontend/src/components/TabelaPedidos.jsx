import React, { useState, useEffect } from 'react';
import AlunoService from '../services/AlunoService';

const TabelaPedidos = ({ onEditarPedido }) => {
  const [pedidos, setPedidos] = useState([]);


  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = () => {
    AlunoService.buscarPedidos().then((response) => {
      setPedidos(response.data.listaPedidos);
    }).catch((error) => {
      console.error('Erro ao buscar pedidos:', error);
    });
  };


  const excluirPedido = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      AlunoService.excluirPedido(codigo).then(() => {
        alert('Pedido excluído com sucesso!');
        carregarPedidos();
      }).catch((error) => {
        alert('Erro ao excluir o pedido: ' + error.message);
      });
    }
  };

  
  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  
  const editarPedido = (pedido) => {
    onEditarPedido(pedido);
  };

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      {pedidos.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Valor Total</th>
              <th>Data do Pedido</th>
              <th>Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.codigo}>
                <td>{pedido.codigo}</td>
                <td>{pedido.descricao}</td>
                <td>{pedido.valorTotal}</td>
                <td>{formatarData(pedido.dataPedido)}</td> {}
                <td>{pedido.clienteId}</td>
                <td>
                  <button onClick={() => editarPedido(pedido)}>Editar</button>
                  <button onClick={() => excluirPedido(pedido.codigo)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
};

export default TabelaPedidos;
