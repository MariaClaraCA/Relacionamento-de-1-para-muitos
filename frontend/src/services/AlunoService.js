/*import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL base do backend

const AlunoService = {
  // Função para buscar clientes pelo termo de pesquisa
  buscarClientes: (termo) => axios.get(`${API_URL}/cliente/${termo}`),

  // Função para gravar (cadastrar) um novo pedido
  gravarPedido: (pedido) => axios.post(`${API_URL}/pedido`, pedido),

  // Função para buscar todos os pedidos
  buscarPedidos: () => axios.get(`${API_URL}/pedido`),

  // Função para atualizar um pedido existente
  atualizarPedido: (pedido) => axios.put(`${API_URL}/pedido`, pedido),

  // Função para excluir um pedido pelo código
  excluirPedido: (codigo) => axios.delete(`${API_URL}/pedido`, {
    data: { codigo }
  }),
};

export default AlunoService; */
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const AlunoService = {
  buscarClientes: (termo) => axios.get(`${API_URL}/cliente/${termo}`),

  gravarCliente: (cliente) => axios.post(`${API_URL}/cliente`, cliente),

  atualizarCliente: (cliente) => axios.put(`${API_URL}/cliente`, cliente),

  excluirCliente: (codigo) => axios.delete(`${API_URL}/cliente`, {
    data: { codigo }
  }),

  buscarPedidos: () => axios.get(`${API_URL}/pedido`),

  gravarPedido: (pedido) => axios.post(`${API_URL}/pedido`, pedido),

  atualizarPedido: (pedido) => axios.put(`${API_URL}/pedido`, pedido),

  excluirPedido: (codigo) => axios.delete(`${API_URL}/pedido`, {
    data: { codigo }
  }),
};

export default AlunoService;

