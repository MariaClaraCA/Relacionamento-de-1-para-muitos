import React, { useState, useEffect } from 'react';
import AlunoService from '../services/AlunoService';

const TabelaClientes = ({ onEditarCliente }) => {
  const [clientes, setClientes] = useState([]);

  // Carrega os clientes ao montar o componente
  useEffect(() => {
    carregarClientes();
  }, []);

  // Função para carregar os clientes
  const carregarClientes = () => {
    AlunoService.buscarClientes('')
      .then((response) => {
        setClientes(response.data.listaClientes);
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
      });
  };

  // Função para excluir um cliente
  const excluirCliente = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      AlunoService.excluirCliente(codigo)
        .then(() => {
          alert('Cliente excluído com sucesso!');
          carregarClientes(); // Recarrega a lista após a exclusão
        })
        .catch((error) => {
          alert('Erro ao excluir o cliente: ' + error.message);
        });
    }
  };

  // Função para editar um cliente
  const editarCliente = (cliente) => {
    // Passa o cliente selecionado para o componente pai (formulário)
    onEditarCliente(cliente);
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.clienteId}>
                <td>{cliente.clienteId}</td>
                <td>{cliente.nome}</td>
                <td>
                  <button onClick={() => editarCliente(cliente)}>Editar</button>
                  <button onClick={() => excluirCliente(cliente.clienteId)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
};

export default TabelaClientes;
