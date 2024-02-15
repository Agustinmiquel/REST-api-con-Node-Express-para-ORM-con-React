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
    clienteController.nuevoCliente);

    // Obtener todos los clientes:
    router.get('/clientes', 
    auth,
    clienteController.mostrarClientes)

    // obtener cliente por ID.
    router.get('/clientes/:idCliente', 
    clienteController.mostrarId)

    // Actualizar Cliente
    router.put('/clientes/editar/:idCliente',  
    clienteController.actualizarCliente);

    // Eliminar un Cliente:
    router.delete('/clientes/:idCliente', 
    clienteController.eliminarCliente)

    // PRODUCTOS

    // nuevos productos:
    router.post('/productos',
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
    router.put('/productos/editar/:idProducto',
    productosController.subirArchivo, 
    productosController.updateProducto);

    // Eliminar Productos:
    router.delete('/productos/:idProducto',
    productosController.eliminarProducto)
    
    // Busqueda de productos
    router.post('/productos/busqueda/:query',
    productosController.BuscarProducto);
    

    // PEDIDOS: 
    
    // nuevo pedido:
    router.post('/pedidos/nuevo/:usuario', 
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
    pedidosController.actualizarPedido)

    // Eliminar un pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    // Eliminar Producto: 
    router.delete('/clientes/:idPedido',
    pedidosController.eliminarPedido)

    // USUARIOS
    router.post('/crear-cuenta',
    auth,
    usuariosController.registrarUsuario);

    router.post('/iniciar-sesion',usuariosController.autenticarUsuario);

    return router
}