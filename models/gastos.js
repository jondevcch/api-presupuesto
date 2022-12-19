const mongoose = require('mongoose');

const GastosSchema = mongoose.Schema({
    id_presupuesto: {
        type: String,
        required: true
    },
    nombre_gasto: {
        type: String,
        required: true
    },
    monto_gasto: {
        type: Number,
        required: true
    }
});


const gasto = mongoose.model('gastos', GastosSchema)
module.exports = gasto;