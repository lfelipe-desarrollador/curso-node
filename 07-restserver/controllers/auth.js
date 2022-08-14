import Usuario from "../models/usuario.js";
import bcrypt from 'bcryptjs';
import generarJWT from "../helpers/generarjwt.js";


const login = async(req, res) => {

    const { correo, password } = req.body;
  

    try {
        
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(400).json({
            msg: 'Ususario no encontrado - Correo'
        })
    }


    //Verificar si el usuario está activo

    if (!usuario.estado) {
        return res.status(400).json({
            msg: 'El usuario no está activo'
        })

    }


    //Verificar la contra
    const isValidPassword = bcrypt.compareSync(password, usuario.password);
    if (!isValidPassword) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        })
    }



    //Generar JWT
    const token = await generarJWT( usuario.id );



    res.json({
        usuario,
        token
        
    })

    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({
            message: 'Ocurrio un error',
            error
        });
    }


};



export {
    login
}