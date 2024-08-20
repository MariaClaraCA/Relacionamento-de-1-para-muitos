import { Router } from "express";
import PedidoCtrl from "../Controle/pedidoCtrl.js";

const pedidoCtrl = new PedidoCtrl();
const rotaPedido = new Router();

rotaPedido
  .get('/', pedidoCtrl.consultar)
  .get('/:termo', pedidoCtrl.consultar)
  .post('/', pedidoCtrl.gravar)
  .patch('/', pedidoCtrl.atualizar)
  .put('/', pedidoCtrl.atualizar)
  .delete('/', pedidoCtrl.excluir);

export default rotaPedido;
