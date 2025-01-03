const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/notesRoutes')
require('dotenv').config()
const db = require('./config/db');
const cors = require('cors');



app.use(cors());

app.use(express.json())

db;

app.use(userRoutes)
app.use(noteRoutes)

app.listen(process.env.PORT, () => {
    console.log("O servidor ta rodando na porta 3000, irmão!")
})

module.exports = app