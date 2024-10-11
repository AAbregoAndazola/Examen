const mongoose = require('mongoose');

const MiInformacionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    sexo: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], required: true }
});

const MiInformacion = mongoose.model('MiInformacion', MiInformacionSchema);
module.exports = MiInformacion;
