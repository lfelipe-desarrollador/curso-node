import  pkg from 'express';
import pep from 'express-validator';

import { crearProducto,
        obtenerProducto, 
        obtenerProductos, 
        actualizarProducto, 
        borrarProducto } from '../controllers/productos.js';
import { existeCategoriaPorId, existeProductoPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import validarJWT from '../middlewares/validar-jwt.js';
import { esAdminRole } from '../middlewares/validar-roles.js';

const { Router } = pkg;
const { check }  = pep;


const router = Router();



//Obtener todos los productos - publico
router.get('/', [

],obtenerProductos)

//Obtener un producto- publico
router.get('/:id', [
    check('id', 'No es un id válido de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

//Crear un producto - privado(cualquier usuario)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)


//Actualizar - privado(cualquier usuario)
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto)


//Eliminar - privado(admin usuario)
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id válido de Mongo').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], borrarProducto)




export default router;