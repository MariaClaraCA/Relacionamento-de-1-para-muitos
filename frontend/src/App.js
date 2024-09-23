/*import React, { useState } from 'react';
import CadastroPedido from './components/CadastroPedido';
import TabelaPedidos from './components/TabelaPedidos';

const App = () => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  const handlePedidoCadastrado = () => {
    // Atualize a tabela de pedidos, por exemplo
    setPedidoSelecionado(null);  // Limpa o pedido selecionado após cadastro/edição
  };

  return (
    <div>
      <h1>Gerenciamento de Pedidos</h1>
      
      {}
      <CadastroPedido
        pedidoSelecionado={pedidoSelecionado}
        onPedidoCadastrado={handlePedidoCadastrado}
      />
      
      {}
      <TabelaPedidos onEditarPedido={setPedidoSelecionado} />
    </div>
  );
};

export default App; */
import React, { useState } from 'react';
import CadastroPedido from './components/CadastroPedido';
import CadastroCliente from './components/CadastroCliente';
import Header from './components/Header';
import TabelaPedidos from './components/TabelaPedidos'; // Importei aqui para o fluxo correto de pedidos

const App = () => {
  const [abaAtiva, setAbaAtiva] = useState('pedidos'); // Controle da aba ativa
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null); // Pedido selecionado para edição
  const [clienteSelecionado, setClienteSelecionado] = useState(null); // Cliente selecionado para edição

  const handleAbaChange = (aba) => {
    setAbaAtiva(aba);
    setPedidoSelecionado(null);  // Limpa o pedido selecionado ao mudar de aba
    setClienteSelecionado(null); // Limpa o cliente selecionado ao mudar de aba
  };

  // Função chamada após cadastrar ou editar um pedido
  const handlePedidoCadastrado = () => {
    setPedidoSelecionado(null);  // Limpa o pedido selecionado após cadastro/edição
  };

  // Função chamada para editar um pedido
  const handleEditarPedido = (pedido) => {
    setPedidoSelecionado(pedido); // Define o pedido selecionado para edição
  };

  // Função chamada após cadastrar ou editar um cliente
  const handleClienteCadastrado = () => {
    setClienteSelecionado(null);  // Limpa o cliente selecionado após cadastro/edição
  };

  return (
    <div>
      <Header abaAtiva={abaAtiva} onAbaChange={handleAbaChange} />

      {abaAtiva === 'pedidos' ? (
        <div>
          <h1>Cadastro de Pedido</h1>
          <CadastroPedido
            pedidoSelecionado={pedidoSelecionado}
            onPedidoCadastrado={handlePedidoCadastrado}
          />
          {/* Adicionando a tabela de pedidos aqui */}
          <TabelaPedidos onEditarPedido={handleEditarPedido} />
        </div>
      ) : (
        <div>
          <h1>Cadastro de Cliente</h1>
          <CadastroCliente
            clienteSelecionado={clienteSelecionado}
            onClienteCadastrado={handleClienteCadastrado}
          />
        </div>
      )}
    </div>
  );
};

export default App;
