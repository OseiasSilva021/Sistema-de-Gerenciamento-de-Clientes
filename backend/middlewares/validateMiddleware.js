const Joi = require('joi')

const validaUsuario = (req, res, next) => {
    
    const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    empresa: Joi.string(),
    setor: Joi.string()

})

const {error} = UserSchema.validate(req.body)
if(error){
    return res.status(400).json({message: error.details[0].message})
}
next()

}

module.exports = validaUsuario