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
    },
    totalGasto: {
        type: Number,
        required: false
    },
    balance: {
        type: Number,
        required: false
    }
});


const Presupuesto = mongoose.model('presupuesto', PresupuestoSchema)
module.exports = Presupuesto;