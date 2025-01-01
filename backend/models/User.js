const { required } = require('joi');
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
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
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
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User