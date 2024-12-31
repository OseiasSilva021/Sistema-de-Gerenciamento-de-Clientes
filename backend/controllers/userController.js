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
    const {id} = req.params
    try{
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({message: "Id inválido!"})
        }

        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(400).json({message: 'Usuário não foi encontrado!'})
        }
    }
    catch(error){

        return res.status(500).json({message: 'Erro ao deleter o usuário!'})

    }
    return res.status(200).json({message: 'Usuário deletado com sucesso!'})
    
}


module.exports = {
    criarUsuario,
    listarUsuarios,
    UpdateUsuarios,
    deletaUsuario,
}