const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    endereço:{
    type: String,
    required: false
    },
    empresa: {
        type: String,
        required: false
    },
    setor: {
        type: String,
        required: false
    },
    role: { 
        type: String, 
        default: "user" // "user" ou "admin"
    }, 
    ultimoContato: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
})

UserSchema.pre('save', async function (next) {

    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', UserSchema)
module.exports = User