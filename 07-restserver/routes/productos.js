import  pkg from 'express';
import pep from 'express-validator';
import { actualizarCategoria, 
        borrarCategoria, 
        crearCategoria,
        obtenerCategoria, 
        obtenerCategorias } from '../controllers/categorias.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import validarJWT from '../middlewares/validar-jwt.js';
import { esAdminRole } from '../middlewares/validar-roles.js';

const { Router } = pkg;
const { check }  = pep;


const router = Router();



//Obtener todas las categorias - publico
router.get('/', [

],obtenerCategorias)

//Obtener una categoria - publico
router.get('/:id', [
    check('id', 'No es un id válido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

//Crear una categoria - privado(cualquier usuario)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)


//Actualizar - privado(cualquier usuario)
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)


//Eliminar - privado(admin usuario)
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id válido de Mongo').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], borrarCategoria)




export default router;