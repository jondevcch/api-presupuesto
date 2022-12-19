const express = require('express');
const routes = express.Router();
const Presupuesto = require('../models/presupuesto');
const Gasto = require('../models/gastos');
const ObjectId = require('mongoose').Types.ObjectId;

routes.get('/servicioDisponible', (req, res) => {
    res.json({ 'Servicio disponible': 'presupuesto' });
});

routes.post('/presupuesto', (req, res) => {
    let nuevo_presupuesto = new Presupuesto({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        monto: req.body.monto,
        divisa: req.body.divisa,
        totalGasto: Number(req.body.totalGasto),
        balance: Number(req.body.balance),
    });

    nuevo_presupuesto.save((error, presupuesto) => {
        if (error) {
            res.json({ msg: "Error al agregar un presupuesto " });
        } else {
            res.json({ msg: "Presupuesto agregado correctamente", presupuesto });
        }
    });
});

routes.get('/presupuestos', (req, res) => {
    Presupuesto.find((error, presupuestos) => {
        if (error) {
            return res.json({ msg: "Error al cargar los presupuestos" });
        }

        res.json(presupuestos);
    });
});

routes.get('/presupuesto/:id', (req, res) => {
    let presupuesto_id = req.params.id;
    if (!ObjectId.isValid(presupuesto_id)) return res.status(400).send(`No existe un presupuesto con el ID: ${presupuesto_id}`);

    Presupuesto.findOne({ _id: presupuesto_id }, (error, presupuesto) => {
        if (error) {
            return res.json({ msg: "Error al cargar el presupuesto" });
        }

        res.json(presupuesto);
    });
});

routes.put('/presupuesto/:id', (req, res) => {
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

router.delete('/presupuesto/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .send(`No existe un presupuesto con el ID: ${presupuesto_id}`);

    Presupuesto.findByIdAndDelete({ _id: req.params.id }, (error, result) => {
        if (error) {
            console.error(`HTTP DELETE error: ${error}`);
            res.json({ msg: `Error al borrar el presupuesto con el id: ${req.body.id}` });
        } else {
            res.json({ msg: "Presupuesto eliminado correctamente: ", result });
        }
    });

});


//Servicios para gastos

routes.post('/gasto', (req, res) => {
    let nuevo_gasto = new Gasto({
        id_presupuesto: req.body.id_presupuesto,
        nombre_gasto: req.body.nombre_gasto,
        monto_gasto: req.body.monto_gasto
    });

    nuevo_gasto.save((error, gasto) => {
        if (error) {
            res.json({ msg: "Error al agregar el gasto para el presupuesto" });
        } else {
            res.json({ msg: "Gasto agregado correctamente", gasto });
        }
    });
});

routes.get('/gastosPresupuesto/:id', (req, res) => {
    let presupuesto_id = req.params.id;

    if (!ObjectId.isValid(presupuesto_id)) return res.status(400).send(`No existe un presupuesto con el ID: ${contact_id}`);

    Gasto.find({ id_presupuesto: presupuesto_id }, (error, gastos) => {
        if (error) {
            return res.json({ msg: "Error al cargar los gastos" });
        }

        res.json(gastos);
    })
});

module.exports = routes;