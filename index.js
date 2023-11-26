const express = require('express');
const routes = require('./routes'); 
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restapinode',{
    useNewUrlParser: true,
});

// Iniciar Servidor
const app = express();

// habilitar el BodyParser: 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Rutas:
app.use(routes());

// Puerto
app.listen(5000);