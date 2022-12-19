const express = require('express');
const routes_presupuesto = express.Router();
const Presupuesto = require('../models/presupuesto');
const ObjectID = require('mongoose').Types.ObjectID;

routes_presupuesto.get('/servicioDisponible', (req, res) => {
    res.json({ 'Servicio disponible': 'presupuesto' });
});

routes_presupuesto.post('/presupuesto', (req, res) => {
    let nuevo_presupuesto = new Presupuesto({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        monto: req.body.monto,
        divisa: req.body.divisa
    });

    nuevo_presupuesto.save((error, presupuesto) => {
        if (error) {
            res.json({ msg: "Error al agregar un presupuesto " });
        } else {
            res.json({ msg: "Presupuesto agregado correctamente", presupuesto });
        }
    });
});

routes_presupuesto.get('/presupuestos', (req, res) => {
    Presupuesto.find((error, presupuestos) => {
        if (error) {
            return res.json({ msg: "Error al cargar los presupuestos" });
        }

        res.json(presupuestos);
    });
});

routes_presupuesto.get('/presupuesto/:id', (req, res) => {
    let presupuesto_id = req.params.id;
    if (!ObjectId.isValid(presupuesto_id)) return res.status(400).send(`No existe un presupuesto con el ID: ${contact_id}`);

    Presupuesto.findOne({ _id: presupuesto_id }, (error, presupuesto) => {
        if (error) {
            return res.json({ msg: "Error al cargar el presupuesto" });
        }

        res.json(presupuesto);
    })
});

routes_presupuesto.put('/presupuesto/:id', (req, res) => {
    let presupuesto_id = req.params.id;
    if (!ObjectId.isValid(presupuesto_id))
        return res
            .status(400)
            .send(`No existe un presupuesto con el ID: ${presupuesto_id}`);

    const presupuesto_actualizado = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        monto: req.body.monto,
        divisa: req.body.divisa
    };

    Presupuesto.findByIdAndUpdate(
        req.params.id, { $set: presupuesto_actualizado }, { new: true },
        (error, document) => {
            if (!error) {
                res.send(document);
            } else {
                console.error(`Error al actualizar el Presupuesto: ${JSON.stringify(error)} `);
            }
        }
    );

});


module.exports = routes_presupuesto;