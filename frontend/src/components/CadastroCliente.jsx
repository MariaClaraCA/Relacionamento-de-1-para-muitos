import React, { useState, useEffect } from 'react';
import AlunoService from '../services/AlunoService';
import TabelaClientes from './TabelaClientes';

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState(null); // Controle de cliente a ser editado

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nome) {
      alert('Preencha o nome do cliente!');
      return;
    }

    const cliente = { nome };

    if (clienteSelecionado) {
      // Atualizar cliente
      AlunoService.atualizarCliente({ ...cliente, codigo: clienteSelecionado.cli_codigo })
        .then((response) => {
          alert('Cliente atualizado com sucesso!');
          resetForm();
        })
        .catch((error) => {
          alert('Erro ao atualizar o cliente: ' + error.message);
        });
    } else {
      // Cadastrar novo cliente
      AlunoService.gravarCliente(cliente)
        .then((response) => {
          alert('Cliente cadastrado com sucesso!');
          resetForm();
        })
        .catch((error) => {
          alert('Erro ao cadastrar o cliente: ' + error.message);
        });
    }
  };

  const resetForm = () => {
    setNome('');
    setClienteSelecionado(null);
  };

  const editarCliente = (cliente) => {
    setNome(cliente.nome);
    setClienteSelecionado(cliente);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do cliente"
        />
        <button type="submit">
          {clienteSelecionado ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
        </button>
      </form>
      <TabelaClientes onEditarCliente={editarCliente} />
    </div>
  );
};

export default CadastroCliente;
