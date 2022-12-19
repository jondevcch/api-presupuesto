const express = require('express');
const routes = express.Router();
const Presupuesto = require('../models/presupuesto');
const Gasto = require('../models/gastos');
const ObjectId = require('mongoose').Types.ObjectId;

routes.get('/servicioDisponible', (req, res) => {
    res.json({ 'Servicio disponible': 'presupuesto' });
});

//Agregar presupuesto
routes.post('/presupuesto', (req, res) => {
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

//Obtener presupuestos
routes.get('/presupuestos', (req, res) => {
    Presupuesto.find((error, presupuestos) => {
        if (error) {
            return res.json({ msg: "Error al cargar los presupuestos" });
        }

        res.json(presupuestos);
    });
});

//Obtener Informacion de un presupuesto
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

//Actualizar presupuesto
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

//Eliminar presupuesto
routes.delete('/presupuesto/:id', (req, res) => {
    let presupuesto_id = req.params.id;
    if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .send(`No existe un presupuesto con el ID: ${presupuesto_id}`);

    Presupuesto.findByIdAndDelete({ _id: presupuesto_id }, (error, result) => {
        if (error) {
            console.error(`HTTP DELETE error: ${error}`);
            res.json({ msg: `Error al borrar el presupuesto con el id: ${presupuesto_id}` });
        } else {
            res.json({ msg: "Presupuesto eliminado correctamente: ", result });
        }
    });

});


//Servicios para gastos

routes.post('/gasto', (req, res) => {
    let nuevo_gasto = new Gasto({
        idPresupuesto: req.body.idPresupuesto,
        nombre: req.body.nombre,
        monto: req.body.monto
    });

    nuevo_gasto.save((error, gasto) => {
        if (error) {
            res.json({ msg: "Error al agregar el gasto para el presupuesto" });
        } else {
            res.json({ msg: "Gasto agregado correctamente", gasto });
        }
    });
});

routes.get('/gasto/:id', (req, res) => {
    let gasto_id = req.params.id;
    if (!ObjectId.isValid(gasto_id)) return res.status(400).send(`No existe un gasto con el ID: ${gasto_id}`);
    Gasto.findOne({ _id: gasto_id }, (error, gasto) => {
        if (error) {
            return res.json({ msg: "Error al cargar el gasto" });
        }
        res.json(gasto);
    });
});

routes.put('/gasto/:id', (req, res) => {
    let gasto_id = req.params.id;
    if (!ObjectId.isValid(gasto_id))
        return res
            .status(400)
            .send(`No existe un gasto con el ID: ${gasto_id}`);

    const gasto_actualizado = {
        nombre: req.body.nombre,
        monto: req.body.monto
    };

    Gasto.findByIdAndUpdate(
        req.params.id, { $set: gasto_actualizado }, { new: true },
        (error, result) => {
            if (!error) {
                res.send(result);
            } else {
                console.error(`Error al actualizar el gasto: ${JSON.stringify(error)} `);
            }
        }
    );

});

routes.delete('/gasto/:id', (req, res) => {
    let gasto_id = req.params.id;
    if (!ObjectId.isValid(req.params.id))
        return res
            .status(400)
            .send(`No existe un gasto con el ID: ${gasto_id}`);

    Gasto.findByIdAndDelete({ _id: req.params.id }, (error, result) => {
        if (error) {
            res.json({ msg: `Error al borrar el gasto con el id: ${gasto_id}` });
        } else {
            res.json({ msg: "Gasto eliminado correctamente: ", result });
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