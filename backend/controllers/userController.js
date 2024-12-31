const User = require('../models/User');
const Joi = require('joi');


const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required()
})

const criarUsuario = async (req, res) => {
    const {name, email, password, phoneNumber} = req.body;
    const {error} = UserSchema.validate({name, email, password, phoneNumber})
    if(error){
        console.log(error)
    }
   const user = await User.create({name, email, password, phoneNumber})
   return res.status(201).json({user})
}

const listarUsuarios = async (req, res) => {
    const users = await User.find()
    return res.json({users})
}

const UpdateUsuarios = async (req, res) =>{

    
    
    const {id} = req.params
    const {name, phoneNumber} = req.body
    const user = await User.findById(id)
    if (!user){
        return res.status(404).json({message: "Usuário não encontrado"})

    }
    user.name = name
  
    user.phoneNumber = phoneNumber
    await user.save() 
    return res.json({user})


}


module.exports = {
    criarUsuario,
    listarUsuarios,
    UpdateUsuarios,
}