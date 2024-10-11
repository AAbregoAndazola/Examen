const express = require('express');
const router = express.Router();
const MiInformacion = require('../models/MiInformacion');


router.post('/participante', async (req, res) => {
    try {
        const nuevaInformacion = new MiInformacion(req.body);
        await nuevaInformacion.save();
        res.status(201).send(nuevaInformacion);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
