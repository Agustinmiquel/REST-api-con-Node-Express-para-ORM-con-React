const express = require('express'); 
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController'); 
const pedidosController = require('../controllers/pedidosController');


module.exports = function(){

    // Agregar clientes
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes:
    router.get('/clientes', clienteController.mostrarClientes)

    // obtener cliente por ID.
    router.get('/clientes/:idCliente', clienteController.mostrarId)

    // Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar un Cliente:
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)

    // nuevos productos:
    router.post('/productos',
    productosController.subirArchivo,
    productosController.nuevoProducto);

    // mostrar productos:
    router.get('/productos',productosController.mostrarProductos)

    // mostrar por Id:
    router.get('/productos/:idProducto', productosController.mostrarIDProducto);

    // Actualizar Productos
    router.put('/productos/editar/:idProducto',
    productosController.subirArchivo, 
    productosController.updateProducto);

    // Eliminar Productos:
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    // Busqueda de productos
    router.post('/productos/busqueda/:query', productosController.BuscarProducto);

    // PEDIDOS: 

    // nuevo pedido:
    router.post('/pedidos', pedidosController.agregarPedidos);

    // mostrar pedidos: 
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // mostrar Pedido por id:
    router.get('/pedidos/:idPedido', pedidosController.mostrarIdPedido);

    // Actualizar producto: 
    router.put('/clientes/:IdProducto',pedidosController.actualizarPedido)

    // Eliminar Producto: 
    router.delete('/clientes/:idPedido', pedidosController.eliminarPedido)

    return router
}