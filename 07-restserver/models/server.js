import  express from "express";
import cors from "cors";

import router from "../routes/user.js";
import router2 from "../routes/auth.js";
import router3 from "../routes/categorias.js";
import router4 from "../routes/productos.js";
import router5 from "../routes/buscar.js";
import { dbConecction } from "../database/config.js";

class Server{


    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosRoutePath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoryPath = '/api/categorias';
        this.productoPath = '/api/productos';
        this.buscar = '/api/buscar';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middleware();


        // Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConecction();
    }


    middleware(){

        //CORS
        this.app.use( cors() );

        //BodyParser
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static("public"));

    };

    routes(){

        this.app.use(this.authPath, router2);
        this.app.use(this.usuariosRoutePath, router);
        this.app.use(this.categoryPath, router3);
        this.app.use(this.productoPath, router4);
        this.app.use(this.buscar, router5);
    }

    config(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }


}


export default Server;