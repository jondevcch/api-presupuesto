require('dotenv').config();
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PWD;

const db_uri = "mongodb+srv://" + db_user + ":" + db_pass + "@cluster0.1vo7dhm.mongodb.net/presupuestoBD?retryWrites=true&w=majority";

const mongoose = require("mongoose");

mongoose.connect(db_uri, (err) => {
    if (!err)
        console.info('MongoDB connection established!');
    else
        console.error('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;