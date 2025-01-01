const { criarUsuario, listarUsuarios, UpdateUsuarios, deletaUsuario, loginUsuario } = require('../controllers/userController');
const { validaUsuario } = require('../middlewares/validateMiddleware')
const express = require('express');

const router = express.Router()

router.get('/users', listarUsuarios) // lista todos os usuários
router.post('/users', criarUsuario) //  cria usuários
router.post('login', loginUsuario)
router.put('/users/:id', UpdateUsuarios, validaUsuario)
router.delete('/users/:id', deletaUsuario) // edita o usuário identificado pelo id



module.exports = router;