import pkg from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';

const { response }  = pkg;






const usuariosGet = async(req, res = response) => {


    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }), 
        Usuario.find({ estado: true })   
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuarioPut = async(req, res = response) => {

    const id = req.params.id;

    const { _id, password, google, correo, ...resto } = req.body;


    //TODO: validar contra base de datos
    if ( password ) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


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

const usuarioDele = async(req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    //Eliminación recomendada
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
    });
};



export {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDele
}