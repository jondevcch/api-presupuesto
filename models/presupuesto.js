const mongoose = require('mongoose');

const PresupuestoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    divisa: {
        type: String,
        required: false
    },
    monto: {
        type: Number,
        required: true
    }
});


const Presupuesto = mongoose.model('presupuesto', PresupuestoSchema)
module.exports = Presupuesto;