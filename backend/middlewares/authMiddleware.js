const jwt = require('jsonwebtoken')

const autenticaToken = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Coloca os dados do usuário no req.user
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido!' });
    }
};

module.exports = autenticaToken
