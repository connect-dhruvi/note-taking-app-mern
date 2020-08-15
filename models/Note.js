const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    updatedAt: {
        type: Date, 
        default:Date.now, 
    },
    isPriority:{
        type: Boolean,
        default: false
    },
    archieve: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    }
}
);

module.exports = mongoose.model('Note',NoteSchema);