const mongoose = require('mongoose');

const GastosSchema = mongoose.Schema({
    idPresupuesto: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    }
});


const gasto = mongoose.model('gastos', GastosSchema)
module.exports = gasto;