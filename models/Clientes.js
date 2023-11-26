const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: Number,
        minlength: 10,
        maxlength: 256
    }
});

module.exports = mongoose.model('clientes', clientesSchema);