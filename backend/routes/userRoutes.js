const { criarUsuario, listarUsuarios, UpdateUsuarios, deletaUsuario } = require('../controllers/userController');
const express = require('express');

const router = express.Router()

router.get('/users', listarUsuarios) // lista todos os usuários
router.post('/users', criarUsuario) //  cria usuários
router.put('/users/:id', UpdateUsuarios)
router.delete('/users/:id', deletaUsuario) // edita o usuário identificado pelo id



module.exports = router;