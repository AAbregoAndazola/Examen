const express = require('express');
const router = express.Router();
const Contrato = require('../models/Contrato');
const MiInformacion = require('../models/MiInformacion');
const Automovil = require('../models/Automovil');
const Caracteristicas = require('../models/Caracteristicas');

router.post('/contrato', async (req, res) => {
    try {
        const { clienteId, automovilId, fechaCompra } = req.body;
        const nuevoContrato = new Contrato({
            cliente: clienteId,
            automovil: automovilId,
            fechaCompra
        });
        await nuevoContrato.save();
        res.status(201).send(nuevoContrato);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/contrato', async (req, res) => {
    try {
        const contratos = await Contrato.find().populate('cliente automovil');
        res.status(200).send(contratos);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/contratos', async (req, res) => {
    try {
        const contratos = await Contrato.find()
            .populate('cliente')
            .populate({
                path: 'automovil',
                populate: { path: 'caracteristicas modelo' }
            });

        const contratosConCostoTotal = contratos.map(contrato => {
            const costoCaracteristicas = contrato.automovil.caracteristicas.reduce((total, caracteristica) => {
                return total + caracteristica.costo;
            }, 0);
            const costoTotal = contrato.automovil.precio + costoCaracteristicas;

            return {
                ...contrato.toObject(),
                costoTotal
            };
        });

        res.render('contratos', { contratos: contratosConCostoTotal });
    } catch (error) {
        res.status(500).send('Error al obtener los contratos');
    }
});

module.exports = router;
