import  pkg from 'express';
import pep from 'express-validator';
import { crearCategoria } from '../controllers/categorias.js';
import existeCategoria from '../helpers/validar-categoria.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import validarJWT from '../middlewares/validar-jwt.js';

const { Router } = pkg;
const { check }  = pep;


const router = Router();



//Obtener todas las categorias - publico
router.get('/', (req, res) => {
  res.json({
    message: 'get'
    });
})

//Obtener una categoria - publico
router.get('/:id', [
    check('id').custom(existeCategoria)
],(req, res) => {
  res.json({
    message: 'get-id'
    });
})

//Crear una categoria - privado(cualquier usuario)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)


//Actualizar - privado(cualquier usuario)
router.put('/:id', (req, res) => {
  res.json({
    message: 'put'
    });
})


//Eliminar - privado(admin usuario)
router.delete('/:id', (req, res) => {
    res.json({
      message: 'del'
      });
  })




export default router;
