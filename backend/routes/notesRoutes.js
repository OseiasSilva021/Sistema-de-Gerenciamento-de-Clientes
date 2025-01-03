const express = require('express');
const { criarNota, listarNotas, atualizarNota, deletarNota } = require('../controllers/notesController');


const router = express.Router();

router.post('/notes', criarNota); // Criar nota
router.get('/notes', listarNotas); // Listar notas do usuário
router.put('/notes/:id', atualizarNota); // Atualizar nota pelo ID
router.delete('/notes/:id', deletarNota); // Deletar nota pelo ID

module.exports = router;
