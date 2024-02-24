const { Schema, model } = require("mongoose")

const productoSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        unique: true,
    },
    description: {
        type: String,
        default: "No definido",
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
    image: {
        type: String,
        default: ""
    }
})

productoSchema.methods.toJSON = function () {
    const {__v, _id, ...rest} = this.toObject();
    rest.id = _id;
    return rest;
};

module.exports = model("producto", productoSchema, "productos");