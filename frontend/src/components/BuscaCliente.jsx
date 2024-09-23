import React, { useState, useEffect } from 'react';
import AlunoService from '../services/AlunoService';

const BuscaCliente = ({ onClienteSelecionado }) => {
  const [clientes, setClientes] = useState([]);
  const [termo, setTermo] = useState('');
  const [selecionado, setSelecionado] = useState(null);

  // Busca os clientes com base no termo digitado (mínimo de 3 caracteres)
  useEffect(() => {
    if (termo.length > 2) {
      AlunoService.buscarClientes(termo).then((response) => {
        setClientes(response.data.listaClientes);
      });
    }
  }, [termo]);

  // Quando um cliente é selecionado
  const handleSelecao = (cliente) => {
    setSelecionado(cliente);
    onClienteSelecionado(cliente);  // Passa o cliente selecionado para o componente pai
  };

  return (
    <div>
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar cliente"
      />
      {clientes.length > 0 && (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.clienteId} onClick={() => handleSelecao(cliente)}>
              {cliente.nome}
            </li>
          ))}
        </ul>
      )}
      {selecionado && <p>Cliente selecionado: {selecionado.nome}</p>}
    </div>
  );
};

export default BuscaCliente;
