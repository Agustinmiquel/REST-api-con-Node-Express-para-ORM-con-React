const express = require('express');
const routes = require('./routes'); 
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

//Permite que un cliente se conecte a otro servidor
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restapinode',{
    useNewUrlParser: true,
});

// Iniciar Servidor
const app = express();

// habilitar el BodyParser: 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Habilitar CORS: 
app.use(cors());

// Rutas:
app.use('/', routes());

// habilitar la carpeta publica
app.use(express.static('uploads'));

// Puerto
app.listen(5000);