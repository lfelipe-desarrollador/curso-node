import  pkg from 'express';
import pep from 'express-validator';
import { usuarioDele, usuarioPost, usuarioPut, usuariosGet } from '../controllers/users.js';
import { emailExistente, esRoleValido } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const { Router } = pkg;
const { check }  = pep;


const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuarioPut);

router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExistente ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuarioPost);

router.delete("/", usuarioDele);



export default router;