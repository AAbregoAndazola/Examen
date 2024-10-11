const mongoose = require('mongoose');

const AutomovilSchema = new mongoose.Schema({
    modelo: { type: mongoose.Schema.Types.ObjectId, ref: 'Modelo', required: true },
    nombre: { type: String, required: true },
    color: { type: String, required: true },
    peso: { type: Number, required: true },
    motor: { type: String, required: true },
    precio: { type: Number, required: true },
    caracteristicas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Caracteristicas' }]
});

const Automovil = mongoose.model('Automovil', AutomovilSchema);
module.exports = Automovil;
