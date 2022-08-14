import pkg from 'mongoose';


const { Schema, model } = pkg;


const RoleSchema = new Schema({

    rol: {
        type: String,
        required: [true, 'Role is required'],
    }
});


export default model('Role', RoleSchema);