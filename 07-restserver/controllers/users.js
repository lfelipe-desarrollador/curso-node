import pkg from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';

const { response }  = pkg;
const usuariosGet = (req, res = response) => {

    const { q, nombre } = req.query;
    

    res.json({
        message:"get API - controlador",
        q,
        nombre
    });
};

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        message:"put API - controlador",
        id
    });
};

const usuarioPost = async(req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const user = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    //Verificar si el correo existe
    
    
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    //Guardar usuario
    await user.save();

    res.json({
        message:"post API - controlador",
        user
    });
};

const usuarioDele = (req, res = response) => {
    res.json({
        message:"del API - controlador"
    });
};



export {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDele
}