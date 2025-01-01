const jwt = require('jsonwebtoken')

const autenticaToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token){
        return res.status(401).json({message: "Acesso negado. Token não foi encontrado!"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Token decoded: ', decoded)
        req.user = decoded
        next()
    } catch(error){
        return res.status(403).json({message: 'Token inválido ou expirado!!', error: error.message})
    }
}

module.exports = autenticaToken