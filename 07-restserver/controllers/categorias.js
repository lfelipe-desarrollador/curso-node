import Categoria from "../models/categoria.js";



//Obtener categorias - paginado - total de categorias - publico - populate
const obtenerCategorias = async(req, res) => {
  
    
    const { limite = 5, desde = 0 } = req.query;

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments({ estado: true }), 
        Categoria.find({ estado: true })   
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categoria
    });

};




//Obtener categoria - publico - populate

const obtenerCategoria = async(req, res) => {
  
    const {id} = req.params;

    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');

    if (!categoria.estado){
        res.status(404).json({
            msg: 'La categoria que buscas ha sido eliminada'
        })
    } else {

        res.json( categoria );
    }


};




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
const actualizarCategoria = async(req, res) => {
  
    const {id} = req.params;

    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id,data, { new:true });

    res.json( categoria );

}

//Borrar categoria - privado - estado:false
const borrarCategoria = async(req, res) => {
    
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, {estado:false}, {new:true} );

    res.json( categoriaBorrada );


}

export {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}