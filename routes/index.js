const express = require('express'); 
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController'); 
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

const auth = require('../middlewares/auth')

module.exports = function(){

    // CLIENTES
    
    // Agregar clientes
    router.post('/clientes',
    auth,
    clienteController.nuevoCliente);

    // Obtener todos los clientes:
    router.get('/clientes', 
    auth,
    clienteController.mostrarClientes)

    // obtener cliente por ID.
    router.get('/clientes/:idCliente', 
    auth, 
    clienteController.mostrarId)

    // Actualizar Cliente
    router.put('/clientes/:idCliente', 
    auth, 
    clienteController.actualizarCliente);

    // Eliminar un Cliente:
    router.delete('/clientes/:idCliente', 
    auth, 
    clienteController.eliminarCliente)

    // PRODUCTOS

    // nuevos productos:
    router.post('/productos', auth,
    productosController.subirArchivo,
    productosController.nuevoProducto);

    // mostrar productos:
    router.get('/productos', 
    auth,
    productosController.mostrarProductos)

    // mostrar por Id:
    router.get('/productos/:idProducto',
    auth, 
    productosController.mostrarIDProducto);

    // Actualizar Productos
    router.put('/productos/editar/:idProducto', auth,
    productosController.subirArchivo, 
    productosController.updateProducto);

    // Eliminar Productos:
    router.delete('/productos/:idProducto', 
    auth,
    productosController.eliminarProducto)
    
    // Busqueda de productos
    router.post('/productos/busqueda/:query',
    auth,
    productosController.BuscarProducto);
    

    // PEDIDOS: 
    
    // nuevo pedido:
    router.post('/pedidos/nuevo/:usuario',
    auth, 
    pedidosController.agregarPedidos);
    
    // mostrar pedidos: 
    router.get('/pedidos', 
    auth,
    pedidosController.mostrarPedidos);

    // mostrar Pedido por id:
    router.get('/pedidos/:idPedido', 
    auth, 
    pedidosController.mostrarIdPedido);

    // Actualizar producto: 
    router.put('/clientes/:IdProducto',
    auth,
    pedidosController.actualizarPedido)

    // Eliminar Producto: 
    router.delete('/clientes/:idPedido', 
    auth, 
    pedidosController.eliminarPedido)


    // USUARIOS
    router.post('/crear-cuenta',
    auth,
    usuariosController.registrarUsuario);

    router.post('/iniciar-sesion',usuariosController.autenticarUsuario);

    return router
}