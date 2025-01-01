const User = require('../models/User');
const Joi = require('joi');
const jwt = require('jsonwebtoken')




const criarUsuario = async (req, res) => {
    const {name, email, password, phoneNumber, empresa, setor} = req.body;
    const {error} = UserSchema.validate({name, email, password, phoneNumber, empresa, setor})
    if(error){
        console.log(error)
    }
   const user = await User.create({name, email, password, phoneNumber, empresa, setor})
   return res.status(201).json({user})
}

const loginUsuario = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Usuário não foi encontrado!'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message: 'Senha incorreta!'})
        }

        const token = jwt.sign({id: user._id, email: user.email, name: user.name},

            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({token})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({message: 'Erro ao fazer login!!', error: err.message})
    }
    
}

const listarUsuarios = async (req, res) => {
    const users = await User.find()
    return res.json({users})
}

const UpdateUsuarios = async (req, res) =>{

    const userId = req.user.id
    const {name, password, phoneNumber, empresa, setor} = req.body
    try{
        const updateData = {}
        if(name){
            if (name.length < 3){
                return res.status(400).json({message: 'O nome deve ter, no mínimo, 3 caracteres!'})
            }
        }
        updateData.name = name
        updateData.phoneNumber = phoneNumber
        updateData.empresa = empresa
        updateData.setor = setor

          if (password) {
            if (password.length < 6) {
              return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
            }
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
          }

            
    // Atualiza o usuário no banco de dados
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna o usuário atualizado sem a senha
    return res.status(200).json({
      message: 'Perfil atualizado com sucesso.',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        password: updatedUser.password,
        empresa: updatedUser.empresa,  
        setor: updatedUser.setor,
      },
    });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o perfil.' });
  }
};



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
    loginUsuario,
}