const { criarUsuario, listarUsuarios, UpdateUsuarios, deletaUsuario, loginUsuario } = require('../controllers/userController');
const autenticaToken = require('../middlewares/authMiddleware');
const express = require('express');

const router = express.Router()

router.get('/users', listarUsuarios) // lista todos os usuários
router.post('/users', criarUsuario) //  cria usuários
router.post('/login', loginUsuario)
router.put('/update', autenticaToken, UpdateUsuarios)
router.delete('/users/:id', deletaUsuario) // edita o usuário identificado pelo id



module.exports = router;