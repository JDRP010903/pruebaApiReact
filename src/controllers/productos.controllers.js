const Producto = require("../models/producto")

const obtenerProductos = async (req, res) => {

    try {
        const productos = await Producto.find()

        return res.json({
            ok: true,
            msg: "Productos obtenidos",
            data: productos
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: "Error en el servidor"
        })
    }
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findById(id)

    return res.json({
        msg: "Producto obtenido",
        data: producto
    })
}

const crearProducto = async (req, res) => {
    const { name, description, price } = req.body;

    const producto = {
        name: name,
        description: description,
        price: price
    }

    // Creamos el producto
    const productoCreado = await Producto(producto).save()

    return res.json({
        msg: "Producto creado",
        data: productoCreado
    })
}

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const productoActualizado = {};
    if (name) {
        productoActualizado.name = name;
    }
    if (description) {
        productoActualizado.description = description;
    }
    if (price) {
        productoActualizado.price = price;
    }

    const resultado = await Producto.findByIdAndUpdate(id, productoActualizado, { new: true });


    return res.json({
        msg: "Producto actualizado",
        data: resultado
    })
}

const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    const productoEliminado = await Producto.findByIdAndDelete(id)

    return res.json({
        msg: "Producto eliminado",
        data: productoEliminado
    })
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};

