const mongoose = require('mongoose');

const ContratoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'MiInformacion', required: true }, 
    automovil: { type: mongoose.Schema.Types.ObjectId, ref: 'Automovil', required: true }, 
    fechaCompra: { type: Date, required: true } 
});

const Contrato = mongoose.model('Contrato', ContratoSchema);
module.exports = Contrato;
