const express = require('express');
const routes = require('./routes'); 
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
require('dotenv').config({path:'variables.env'});

//Permite que un cliente se conecte a otro servidor
const cors = require('cors');

// Iniciar Servidor
const app = express();
// habilitar la carpeta publica
app.use(express.static('uploads'));

// DEFINIR Dominio para recibir peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin:(origin, callback) => {
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        } else{
            callback(new Error('No permitido'))
        }
    }
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
});

// habilitar el BodyParser: 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Habilitar CORS: 
app.use(cors());

// Rutas:
app.use('/', routes());


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000

// Puerto
app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);
});