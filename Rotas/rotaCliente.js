import { Router } from "express";
import ClienteCtrl from "../Controle/clienteCtrl.js";

const clienteCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente
    .get('/', clienteCtrl.consultar)
    .get('/:termo', clienteCtrl.consultar)
    .post('/', clienteCtrl.gravar)
    .patch('/', clienteCtrl.atualizar)
    .put('/', clienteCtrl.atualizar)
    .delete('/', clienteCtrl.excluir);

export default rotaCliente;
