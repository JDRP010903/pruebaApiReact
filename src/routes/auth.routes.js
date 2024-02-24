const { Router } = require("express");
const { registrarUsuario, iniciarSesion, validarUsuario } = require("../controllers/auth.controllers.js")
const { validarJWT } = require("../middlewares/jwt.middleware.js")

const router = Router();

router.post("/registrar_usuario", registrarUsuario);
router.post("/iniciar_sesion", iniciarSesion);
router.get("/validar_usuario", validarJWT, validarUsuario)

module.exports = router;