import  pkg from 'express';
import pep from 'express-validator';
import { login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const { Router } = pkg;
const { check }  = pep;


const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({ min: 6 }),
    validarCampos
],login);



export default router;
