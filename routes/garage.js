const express = require('express');
const router = express.Router();
const Automovil = require('../models/Automovil');
const Modelo = require('../models/Modelo');
const Caracteristicas = require('../models/Caracteristicas');
const Contrato = require('../models/Contrato');

router.post('/caracteristicas', async (req, res) => {
    try {
        const { descripcion, costo } = req.body;
        const nuevaCaracteristica = new Caracteristicas({ descripcion, costo });
        await nuevaCaracteristica.save();
        res.status(201).send(nuevaCaracteristica);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/caracteristicas', async (req, res) => {
    try {
        const caracteristicas = await Caracteristicas.find();
        res.status(200).send(caracteristicas);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/automovil', async (req, res) => {
    try {
        const { modeloId, nombre, color, peso, motor, precio, caracteristicasIds } = req.body;
        const nuevoAutomovil = new Automovil({
            modelo: modeloId,
            nombre,
            color,
            peso,
            motor,
            precio,
            caracteristicas: caracteristicasIds
        });
        await nuevoAutomovil.save();
        res.status(201).send(nuevoAutomovil);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/automovil', async (req, res) => {
    try {
        const automoviles = await Automovil.find().populate('modelo caracteristicas');
        res.status(200).send(automoviles);
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
