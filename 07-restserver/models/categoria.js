import pkg from 'mongoose';


const { Schema, model } = pkg;


const CategoriaSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre is required'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


export default model('Categoria', CategoriaSchema);