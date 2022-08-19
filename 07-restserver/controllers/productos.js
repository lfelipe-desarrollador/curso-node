import Producto from "../models/producto.js";



//Obtener categorias - paginado - total de categorias - publico - populate
const obtenerProductos = async(req, res) => {
  
    
    const { limite = 5, desde = 0 } = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ estado: true }), 
        Producto.find({ estado: true })   
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });

};




//Obtener categoria - publico - populate

const obtenerProducto = async(req, res) => {
  
    const {id} = req.params;

    const producto = await Producto.findById( id )
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre');

    if (!producto.estado){
        res.status(404).json({
            msg: 'La categoria que buscas ha sido eliminada'
        })
    } else {

        res.json( producto );
    }


};




//Crear categoria
const crearProducto = async(req, res) => {
  
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if(productoDB){
        return res.status(400).json({
            ok: false,
            msg: 'El producto ya existe'
        });
    };

    if (!productoDB) {
        const producto = new Producto({
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        });
        await producto.save();
        res.status(201).json({
            message: 'Producto creada correctamente'
        });
    }

};


//Actualizar categoria - privado - populate
const actualizarProducto = async(req, res) => {
  
    const {id} = req.params;

    const { estado, usuario, ...data } = req.body;

    if (data.nombre){

        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id,data, { new:true });

    res.json( producto );

}

//Borrar categoria - privado - estado:false
const borrarProducto = async(req, res) => {
    
    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate( id, {estado:false}, {new:true} );

    res.json( productoBorrado );


}

export {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto 
}