const { Schema, model } = require("mongoose")

const userSchema = Schema({
    user_name: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    edad: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
})

userSchema.methods.toJSON = function () {
    const {__v, _id, ...rest} = this.toObject();
    rest.id = _id;
    return rest;
};

module.exports = model("user", userSchema, "usuarios");