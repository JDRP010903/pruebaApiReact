const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async (req, res, next) => {
    try {
        const token = req.header("x-token");

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: "No hay token en la petición",
                data: {}
            })
        }
        
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
    
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: "Token Invalido",
                data: {}
            })
        }
    
        req.user = user;
    
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token Invalido",
            data: {}
        })
    }
}

module.exports = {
    validarJWT
}