import { response } from 'express';


const usuariosGet = (req, res = response) => {

    const { q, nombre } = req.query;
    

    res.json({
        message:"get API - controlador",
        q,
        nombre
    });
};

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        message:"put API - controlador",
        id
    });
};

const usuarioPost = (req, res = response) => {

    const body = req.body;

    res.json({
        message:"post API - controlador",
        body
    });
};

const usuarioDele = (req, res = response) => {
    res.json({
        message:"del API - controlador"
    });
};



export {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDele
}