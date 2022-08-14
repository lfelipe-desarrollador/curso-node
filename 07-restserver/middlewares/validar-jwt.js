import Jwt from "jsonwebtoken";
import usuario from "../models/usuario.js";
import Usuario from "../models/usuario.js";


const validarJWT = async(req, res, next) => {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
    });
    }

    try {

        const { uid } = Jwt.verify(token, process.env.SECRET_KEY);

        // leer el usuario que corresponde al uid

        const usuario = await Usuario.findById(uid);

    

        if (!usuario){
            return res.status(401).json({
                msg: 'Token no valido- usuario no existe en BD'
            });
        }

        // Verificar si el uid tiene estado true

        if (!usuario.estado){
            return res.status(401).json({
                msg: 'El usuario no está activo'
            });
        }


        req.usuario = usuario;

        
        next()
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(401).json({
            msg: 'Token no válido'
        });
    }





};


export default validarJWT;