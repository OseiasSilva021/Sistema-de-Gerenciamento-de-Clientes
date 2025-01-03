const Notes = require('../models/Notes');

// Criar uma nota
const criarNota = async (req, res) => {
    const { description, name, email } = req.body;
    const userId = req.params.id; // Supondo que o middleware de autenticação adiciona req.user

    try {
        const newNote = await Notes.create({ description, name, email, user: userId });
        return res.status(201).json({ message: 'Nota criada com sucesso!', note: newNote });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar nota!' });
    }
};

// Listar todas as notas de um usuário
const listarNotas = async (req, res) => {
    const userId = req.params.id;

    try {
        const notes = await Notes.find({ user: userId });
        return res.status(200).json({ notes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao listar notas!' });
    }
};

// Atualizar uma nota
const atualizarNota = async (req, res) => {
    const { id } = req.params;
    const { description, name, email } = req.body;
    const userId = req.params.id;

    try {
        const updatedNote = await Notes.findOneAndUpdate(
            { _id: id, user: userId },
            { description },
            {email},
            {name},
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Nota não encontrada ou acesso negado!' });
        }

        return res.status(200).json({ message: 'Nota atualizada com sucesso!', note: updatedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar nota!' });
    }
};

// Deletar uma nota
const deletarNota = async (req, res) => {
    const { id } = req.params;
    const userId = req.params.id;

    try {
        const deletedNote = await Notes.findOneAndDelete({ _id: id, user: userId });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Nota não encontrada ou acesso negado!' });
        }

        return res.status(200).json({ message: 'Nota deletada com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar nota!' });
    }
};

module.exports = {
    criarNota,
    listarNotas,
    atualizarNota,
    deletarNota,
};
