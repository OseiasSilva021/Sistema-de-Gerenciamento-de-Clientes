const mongoose = require('mongoose');

let NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
       
    },
    
    updatedAt: {
        type: Date
    }
    ,
    deletedAt: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: {
        type: Array
    },
    category: {
        type: String
    },
    status: {
        type: String
    },
    priority: {
        type: String
    },
    dueDate: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },




    
})
