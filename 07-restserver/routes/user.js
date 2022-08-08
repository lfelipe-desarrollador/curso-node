import  { Router } from 'express';
import { usuarioDele, usuarioPost, usuarioPut, usuariosGet } from '../controllers/users.js';


const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuarioPut);

router.post("/", usuarioPost);

router.delete("/", usuarioDele);



export default router;