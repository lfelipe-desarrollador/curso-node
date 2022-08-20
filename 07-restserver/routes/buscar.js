import  pkg from 'express';
import pep from 'express-validator';
import { buscar } from '../controllers/buscar.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const { Router } = pkg;
const { check }  = pep;


const router = Router();


router.get('/:coleccion/:termino', buscar)



export default router;