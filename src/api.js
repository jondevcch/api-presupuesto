require('dotenv').config();

const body_parser = require('body-parser');

const express = require('express');

const cors = require('cors');

const db = require('../database/db');

const routes_presupuesto = require('../routes/routes_presupuesto');

const api_port = process.env.API_PORT || 3000;

const app = express();
app.use(cors());
app.use(body_parser.json());
app.use('/curso_angular/api', routes_presupuesto);

app.listen(api_port, () => {
    console.info(`Backend server running on port ${api_port}`);
});