import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";
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
    if(existeCorreo){
        throw new Error(`El correo ${ correo } ya existe`);
    };
}


const existeUsuarioPorId = async( id = '' ) => {
    const existeid = await Usuario.findById( id );
    if(!existeid){
        throw new Error(`El id ${ id } no existe`);
    };
}

const existeCategoriaPorId = async( id = '' ) => {
    const existeCategoria = await Categoria.findById( id );
    if(!existeCategoria){
        throw new Error(`El id ${ id } no existe`);
    };
}

const existeProductoPorId = async( id = '' ) => {
    const existeProducto = await Producto.findById( id );
    if(!existeProducto){
        throw new Error(`El id ${ id } no existe`);
    };
}



export {
    esRoleValido,
    emailExistente,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}