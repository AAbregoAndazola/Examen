const mongoose = require('mongoose');

const CaracteristicasSchema = new mongoose.Schema({
    descripcion: { type: String, required: true },
    costo: { type: Number, required: true }
});

const Caracteristicas = mongoose.model('Caracteristicas', CaracteristicasSchema);
module.exports = Caracteristicas;
