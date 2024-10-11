const express = require('express');
const mongoose = require('mongoose');
const participanteRoutes = require('./routes/participante'); 
const garajeRoutes = require('./routes/garage');
const contratoRoutes = require('./routes/contrato');
const app = express();
const PORT = 3002;

app.set('view engine', 'ejs');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ExamenDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión:', err));

app.use('/api', participanteRoutes);
app.use('/api', garajeRoutes);
app.use('/api', contratoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
