import Role from "../models/role.js";
import Usuario from "../models/usuario.js";





const esRoleValido = async( rol = '' ) => {
    
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no es válido`);
    }
};


const emailExistente = async( correo = '' ) => {
    const existeCorreo = await Usuario.findOne({ correo });
    console.log(existeCorreo);
    if(existeCorreo){
        throw new Error(`El correo ${ correo } ya existe`);
    };
}



export {
    esRoleValido,
    emailExistente
}