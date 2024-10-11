const mongoose = require('mongoose');

const ModeloSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    año: { type: Number, required: true}
});

const Modelo = mongoose.model('Modelo', ModeloSchema);
module.exports = Modelo;
