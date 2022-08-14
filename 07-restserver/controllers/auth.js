import Usuario from "../models/usuario.js";
import bcrypt from 'bcryptjs';
import generarJWT from "../helpers/generarjwt.js";
import { googleVerify } from "../helpers/google-verify.js";


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


const googleSingIn = async(req, res) => {
    

    const { id_token } = req.body;

    try {
        
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            usuario = new Usuario({
                nombre,
                correo,
                img,
                password: ':V',
                estado: true,
                google: true
            });

            await usuario.save();

        }

        // Si eol user en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el admin, usuario bloqueado'
            })
        };

        const token = await generarJWT( usuario.id );
       

        res.json({
            usuario,
            id_token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

};



export {
    login,
    googleSingIn
}