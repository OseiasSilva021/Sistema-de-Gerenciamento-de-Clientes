const { criarUsuario, listarUsuarios, UpdateUsuarios, deletaUsuario, loginUsuario, editaUsuariosPeloID , updateUser, pesquisaUsuario } = require('../controllers/userController');
const autenticaToken = require('../middlewares/authMiddleware');
const express = require('express');

const router = express.Router()

router.get('/users', listarUsuarios) // lista todos os usuários
router.post('/users', criarUsuario) //  cria usuários
router.get('/users/pesquisa', pesquisaUsuario) // pesquisa usuário
router.post('/login', loginUsuario)
router.get('/users/profile/:id', updateUser)
router.put('/update', autenticaToken, UpdateUsuarios)
router.put('/users/:id', editaUsuariosPeloID)
router.delete('/users/:id', deletaUsuario) // edita o usuário identificado pelo id



module.exports = router;