import mongoose from 'mongoose'
import Usuario from '../models/usuario.js';
import Producto from '../models/producto.js';
import Categoria from '../models/categoria.js';

const coleccionesPermitidas = [
    'usuario',
    'categoria',
    'producto',
    'role'
]

const buscarUsuarios = async(termino = '', res ) => {
  
    const isMongoId = mongoose.Types.ObjectId.isValid( termino );

    if ( isMongoId ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    const regex = new RegExp( termino, 'i' )

    const usuarios = await Usuario.find({
        $or: [{nombre:regex}, {correo:regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios 
    })


};

const buscarCategorias = async(termino = '', res ) => {
  
    const isMongoId = mongoose.Types.ObjectId.isValid( termino );

    if ( isMongoId ){
        const cateogria = await Categoria.findById( termino );
        return res.json({
            results: ( cateogria ) ? [ cateogria ] : []
        })
    }

    const regex = new RegExp( termino, 'i' )

    const categorias = await Categoria.find({
        $or: [{nombre:regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: categorias 
    })
};

const buscarProductos = async(termino = '', res ) => {
  
    const isMongoId = mongoose.Types.ObjectId.isValid( termino );

    if ( isMongoId ){
        const producto = await Producto.findById( termino ).populate('categoria', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regex = new RegExp( termino, 'i' )

    const productos = await Producto.find({
        $or: [{nombre:regex}],
        $and: [{estado: true}, {disponible: true}]
    }).populate('categoria', 'nombre');

    res.json({
        results: productos 
    })
};

const buscar = (req, res) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino, res);
            break;
        case 'categoria':
            buscarCategorias(termino, res)
            break;
        case 'producto':
            buscarProductos(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta busqueda'
            })
    }

  

};


export {
    buscar
}