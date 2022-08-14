import  pkg from 'express';
import pep from 'express-validator';
import { usuarioDele, usuarioPost, usuarioPut, usuariosGet } from '../controllers/users.js';
import { emailExistente, esRoleValido, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import validarJWT from '../middlewares/validar-jwt.js';
import {tieneRole} from '../middlewares/validar-roles.js';



const { Router } = pkg;
const { check }  = pep;


const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuarioPut);

router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExistente ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuarioPost);

router.delete("/:id", [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuarioDele);



export default router;