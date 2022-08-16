import Categoria from "../models/categoria.js";



//Obtener categorias - paginado - total de categorias - publico - populate





//Obtener categoria - publico - populate





//Crear categoria
const crearCategoria = async(req, res) => {
  
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne({ nombre });

    if(categoriaDb){
        return res.status(400).json({
            ok: false,
            msg: 'La categoria ya existe'
        });
    };

    if (!categoriaDb) {
        const categoria = new Categoria({
            nombre,
            usuario: req.usuario._id
        });
        await categoria.save();
        res.status(201).json({
            message: 'Categoria creada correctamente'
        });
    }

};


//Actualizar categoria - privado - populate





//Borrar categoria - privado - estado:false


export {
    crearCategoria
}