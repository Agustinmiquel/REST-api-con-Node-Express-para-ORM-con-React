const Clientes = require('../models/Clientes');


exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        await cliente.save();
        res.json({
            mensaje: 'cliente guardado'
        })
        console.log(cliente)
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarClientes= async (req,res, next) =>{
    try {
        // le pasamos un objeto vacio a find para que nos traiga a todos
        const cliente = await Clientes.find({});
        res.json(cliente);
    } catch(error){
        console.log(error);
        next();
    }
}

exports.mostrarId = async (req,res,next) =>{

        const cliente = await Clientes.findById(req.params.idCliente)
        
        if(!cliente){
            res.json({
                mensaje: 'no existe el cliente'
            });
            next()
        }

        //mostrar el cliente
        res.json(cliente);
}

exports.actualizarCliente = async (req,res,next) =>{
    try{
        const cliente = await Clientes.findByIdAndUpdate({ _id : req.params.idCliente}, req.body, {
            new: true
        });
        res.json(cliente);

    } catch(error){
        console.log(error);
        next();
    }
}

exports.eliminarCliente = async (req,res,next) => {
    try {
        await Clientes.findByIdAndDelete({_id: req.params.idCliente}); 
        res.json({
            mensaje: 'cliente eliminado'
        })
    } catch (error) {
        console.log(error)
    }; 
    next();
}