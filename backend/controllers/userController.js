const User = require('../models/User');
const Joi = require('joi');


const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    empresa: Joi.string(),
    setor: Joi.string()

})

const criarUsuario = async (req, res) => {
    const {name, email, password, phoneNumber, empresa, setor} = req.body;
    const {error} = UserSchema.validate({name, email, password, phoneNumber, empresa, setor})
    if(error){
        console.log(error)
    }
   const user = await User.create({name, email, password, phoneNumber, empresa, setor})
   return res.status(201).json({user})
}

const listarUsuarios = async (req, res) => {
    const users = await User.find()
    return res.json({users})
}

const UpdateUsuarios = async (req, res) =>{

    
    
    const {id} = req.params
    const {name, phoneNumber, empresa, setor} = req.body
    const user = await User.findById(id)
    if (!user){
        return res.status(404).json({message: "Usuário não encontrado"})

    }
    user.empresa = empresa
    user.setor = setor
    user.name = name
    user.phoneNumber = phoneNumber

    await user.save() 
    return res.json({user})


}
const deletaUsuario = async (req, res) => {
    
}


module.exports = {
    criarUsuario,
    listarUsuarios,
    UpdateUsuarios,
}