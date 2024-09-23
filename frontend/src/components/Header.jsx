import React from 'react';

const Header = ({ abaAtiva, onAbaChange }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: abaAtiva === 'pedidos' ? 'lightblue' : '' }}
        onClick={() => onAbaChange('pedidos')}
      >
        Cadastrar Pedido
      </button>
      <button
        style={{ backgroundColor: abaAtiva === 'clientes' ? 'lightblue' : '' }}
        onClick={() => onAbaChange('clientes')}
      >
        Cadastrar Cliente
      </button>
    </div>
  );
};

export default Header;
