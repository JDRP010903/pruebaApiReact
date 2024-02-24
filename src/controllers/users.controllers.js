const User = require("../models/user");
const bcrypt = require("bcrypt");

const obtenerUsuarios = async (req, res) => {
    const usuarios = await User.find();

    return res.json({
        msg: "Usuarios obtenidos",
        data: usuarios
    })
}

const obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    const usuarioById = await User.findById(id)
    return res.json({
        msg: "Usuario obtenido",
        data: usuarioById
    })
}

const crearUsuario = async (req, res) => {

    // Encriptando la contraseña
    const salt = bcrypt.genSaltSync(10);

    const usuario = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, salt)
    }

    // Crear el usuario en la base de MongoDB
    const usuarioCreado = await User(usuario).save()

    return res.json({
        msg: "Usuario creado",
        data: usuarioCreado
    })
}

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;

    const usuarioActualizado = {
        ...req.body,
    };

    const resultado = await User.findByIdAndUpdate(id, usuarioActualizado, { new: true });

    return res.json({
        msg: "Usuario actualizado",
        usuario: resultado
    })
}

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    const usuarioEliminado = await User.findByIdAndDelete(id)

    return res.json({
        msg: "Usuario eliminado",
        data: usuarioEliminado
    })
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};

