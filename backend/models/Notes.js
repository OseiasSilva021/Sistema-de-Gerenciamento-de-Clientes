const mongoose = require('mongoose');

let NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false

    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required:false
    },

    user: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
       
    }
    
})

const Notes = mongoose.model('Notes', NotesSchema)
module.exports = Notes
