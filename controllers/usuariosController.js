const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req,res) =>{

    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password,12);

    try {
        await usuario.save();
        res.json({message:'usuario creado'});
    } catch (error) {
        console.log(error);
        res.json('Hubo un error');
    }
}

exports.autenticarUsuario = async (req, res, next) => {

    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({email});

    if (!usuario){
        await res.status(401).json({message:'El usuario no existe'});
        next();
    } else {
        // verificar si el password es correcto
        if(!bcrypt.compareSync(password, usuario.password)){
            await res.status(401).json({message: 'password incorrecto'});
            next()
        } else{
            const token = jwt.sign({
                email: usuario.email,
                nombre:usuario.nombre,
                id: usuario._id
            },'LLAVESECRETA',{expiresIn:'1h'});

            res.json({token});
        }
    }
}