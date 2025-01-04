const User = require('../models/User');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const criarUsuario = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        phoneNumber: Joi.string().min(8),
        empresa: Joi.string(),
        setor: Joi.string().optional(),
        ultimoContato: Joi.string().optional(),
        status: Joi.string().optional(),
        notes: Joi.string().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await User.create(req.body);
        return res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar usuário!' });
    }
};

const pesquisaUsuario = async (req, res) => {
    const { search } = req.query; // Obtém o termo de busca da query string

    try {
        // Filtro básico
        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } }, // Busca por nome
                    { email: { $regex: search, $options: 'i' } },
                    { status: { $regex: search, $options: 'i' } }  // Busca por e-mail
                ]
            }
            : {};

        // Buscar usuários no banco
        const users = await User.find(query);
        res.json({ success: true, users });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ success: false, message: 'Erro ao buscar usuários' });
    }
};

const editaUsuariosPeloID = async (req, res) => {
    console.log('Requisição recebida para editar o usuário:', req.body);
    const schema = Joi.object({
        name: Joi.string().min(3).optional(),
        email: Joi.string().email().optional(),  // Tornando o email opcional para edição
        phoneNumber: Joi.string().optional(),
        empresa: Joi.string().optional(),
        setor: Joi.string().optional(),
        ultimoContato: Joi.string().optional(),
        status: Joi.string().optional(),
        notes: Joi.string().optional(),
    });
    

    try {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                status: "error",
                message: "Validação falhou!",
                details: error.details.map(err => err.message),
            });
        }

        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "O ID do usuário é obrigatório!" });
        }

        // Atualiza o usuário no banco de dados
        const updatedUser = await User.findByIdAndUpdate(userId, value, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        return res.status(200).json({
            message: "O usuário foi atualizado com sucesso!",
            user: updatedUser
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

const updateUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).optional(),
        email: Joi.string().email().optional(),  // Tornando o email opcional para edição
        phoneNumber: Joi.string().optional(),
        empresa: Joi.string().optional(),
        setor: Joi.string().optional(),
        ultimoContato: Joi.string().optional(),
        status: Joi.string().optional(),
        notes: Joi.string().optional(),
    });

    // Validar os dados recebidos no corpo da requisição
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const userId = req.params.id; // Pegando o ID dos parâmetros da rota

    // Validar o formato do ID
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) { // Verificando se o ID é válido
        return res.status(400).json({ message: 'ID inválido!' });
    }

    try {
        // Verifica se o e-mail foi alterado e se já existe outro usuário com o mesmo e-mail
        if (value.email) {
            const existingUser = await User.findOne({ email: value.email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ message: 'E-mail já cadastrado!' });
            }
        }

        // Atualizando o usuário com os dados validados
        const updatedUser = await User.findByIdAndUpdate(userId, value, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        return res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            user: updatedUser,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao atualizar usuário!' });
    }
};

const loginUsuario = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        // Credenciais do admin pré-definidas
        const adminEmail = "admin@example.com";
        const adminPassword = "admin123"; // Sempre armazene em variáveis de ambiente

        // Verifica se o login é de um administradord 
        if (email === adminEmail && password === adminPassword) {
            const adminToken = jwt.sign(
                { email, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).json({ token: adminToken, role: "admin" });
        }

        // Login de usuários normais
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token, role: "user" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao fazer login!' });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclui o campo password
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao listar usuários!' });
    }
};

const UpdateUsuarios = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        password: Joi.string().min(6),
        phoneNumber: Joi.string(),
        empresa: Joi.string(),
        setor: Joi.string().optional(),
        ultimoContato: Joi.string().optional(),
        status: Joi.string().optional(),
        notes: Joi.string().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user.id;
    const updateData = { ...req.body };

    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const { password, ...userData } = updatedUser.toObject(); // Remove o password do retorno
        return res.status(200).json({ message: 'Perfil atualizado com sucesso.', user: userData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao atualizar o perfil.' });
    }
};

const deletaUsuario = async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'ID inválido!' });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao deletar o usuário!' });
    }
};

module.exports = {
    criarUsuario,
    listarUsuarios,
    UpdateUsuarios,
    deletaUsuario,
    loginUsuario,
    editaUsuariosPeloID,
    updateUser,
    pesquisaUsuario,
}