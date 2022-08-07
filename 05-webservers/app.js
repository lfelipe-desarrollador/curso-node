import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';



const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//handlebars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials');

// Servir contenido estático
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("home", {
        nombre: "Luis",
        titulo: 'Aprendiendo node'
    });
});

app.get("/elements", (req, res) => {
    res.render("elements", {
        nombre: "Luis",
        titulo: 'Elementos'
    });
});

app.get("/generic", (req, res) => {
    res.render("generic", {
        nombre: "Luis",
        titulo: 'Generalidades'
    });
});




app.listen(process.env.PORT || 3000);