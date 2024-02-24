const User = require("../models/user");
const { generarJWT } = require("../helpers/jwt.helper.js")
const bcrypt = require("bcrypt")

const registrarUsuario = async (req, res) => {
    try {
        const {user_name, email, password} = req.body;

        salt = bcrypt.genSaltSync(10);
    
        const usuario = {
            user_name: user_name,
            email: email,
            password: bcrypt.hashSync(password, salt)
        }
    
        const usuarioRegistrado = await User(usuario).save();
    
        const token = await generarJWT(usuarioRegistrado.id)
    
        return res.json({
            "ok": true,
            msg: "Usuario registrado",
            token: token,
            data: usuarioRegistrado
        })
    } catch (error) {
        return res.json({
            "ok": false,
            msg: "Error en el servidor"
        })
    }
}

const iniciarSesion = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        const user = await User.findOne({user_name: user_name})
        const passwordCompared = bcrypt.compareSync(password, user.password)
    
        if ((!user) || (!passwordCompared)) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario o la contraseña son incorrectos",
                data: {}
            })
        }
        const token = await generarJWT(user.id)
    
        return res.json({
            ok: true,
            msg: "Inicio de sesión exitoso",
            token: token,
            data: user
        })
    } catch (error) {
        return res.json({
            "ok": false,
            msg: "Error en el servidor"
        })
    }
}

const validarUsuario = async (req, res) => {
    try {
        const { user } = req;

        const token = await generarJWT(user.id)
    
    
        return res.json({
            ok: true,
            msg: "Usuario validado",
            token: token,
            data: user
        })
    } catch (error) {
        return res.json({
            "ok": false,
            msg: "Error en el servidor"
        })
    }
}

module.exports = {
    registrarUsuario,
    iniciarSesion,
    validarUsuario
};