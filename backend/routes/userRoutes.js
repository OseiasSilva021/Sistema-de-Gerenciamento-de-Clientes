const { criarUsuario, listarUsuarios, UpdateUsuarios } = require('../controllers/userController');
const express = require('express');

const router = express.Router()

router.get('/users', listarUsuarios)
router.post('/users', criarUsuario)
router.put('/users/:id', UpdateUsuarios)

module.exports = router;