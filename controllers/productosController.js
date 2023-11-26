const Producto = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Productos = require('../models/Productos');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

// agregar nuevos productos
exports.nuevoProducto = async (req,res,next) => {

    const producto = new Producto(req.body)

    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({
            mensaje: 'Producto agregado correctamente'
        })
    } catch (error) {
        console.log(error)
        next();
    }; 
}

// Mostrar todos los productos
exports.mostrarProductos = async (req, res, next) =>{

    try {
        const producto = await Producto.find({})
        res.json({
            producto
        })
    } catch (error) {
        console.log(error)
        next();
    }
}

exports.mostrarIDProducto = async (req, res, next) => {
    const producto = await Producto.findById(req.params.idProducto)

    if(!producto){
        res.json({
            mensaje:"Ese producto no existe"
        });
        next();
    }

    res.json(producto);
}

// Actualizar Producto vi ID
exports.updateProducto = async (req, res, next) => {

        const { idProducto } = req.params;
    
        try {
            // Construir un nuevo producto
            let nuevoProducto = req.body;
    
            // Verificar si hay imagen nueva
            if (req.file) {
                nuevoProducto.imagen = req.file.filename;
            } else {
                let productoAnterior = await Producto.findById(idProducto);
                nuevoProducto.imagen = productoAnterior.imagen;
            }
    
            let producto = await Producto.findOneAndUpdate({ _id: idProducto },
                nuevoProducto, {
                new: true
            });
    
            res.json({
                producto,
                mensaje: 'Producto actualizado',
            });
        } catch (error) {
            console.log(error);
            next();
        }
 }
    
exports.eliminarProducto = async (req,res,next)=>{
    try {
        await Producto.findByIdAndDelete({ _id: req.params.idProducto }); 
        res.json({
            mensaje: 'El producto se ha eliminado'
        })
    } catch (error) {
        console.log(error);
    }
}
