const { criarUsuario, listarUsuarios, UpdateUsuarios } = require('../controllers/userController');
const express = require('express');

const router = express.Router()

router.get('/users', listarUsuarios) // lista todos os usuários
router.post('/users', criarUsuario) //  cria usuários
router.put('/users/:id', UpdateUsuarios) // edita o usuário identificado pelo id

module.exports = router;