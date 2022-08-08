import  express from "express";
import cors from "cors";

import router from "../routes/user.js";

class Server{


    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosRoutePath = '/api/usuarios';

        //Middlewares
        this.middleware();


        // Rutas de mi app
        this.routes();
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

        this.app.use(this.usuariosRoutePath, router);
    }

    config(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }


}


export default Server;