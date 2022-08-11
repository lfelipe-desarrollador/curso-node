import pkg from 'mongoose';
const { Schema, model } = pkg;

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    correo : {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});


UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}




export default model('Usuario', UsuarioSchema);



