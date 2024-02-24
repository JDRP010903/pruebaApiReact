const { Router } = require("express");
const {     obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos.controllers")
const { validarJWT } = require("../middlewares/jwt.middleware")

const router = Router();

router.get("/", validarJWT, obtenerProductos);
router.get("/:id", obtenerProducto);
router.post("/", crearProducto); 
router.put("/:id", actualizarProducto); 
router.delete("/:id", eliminarProducto); 

module.exports = router;