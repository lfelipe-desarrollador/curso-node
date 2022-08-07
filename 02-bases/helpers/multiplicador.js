const fs = require('fs');

const color = require('colors');

const crearArchivo = async(base = 5, listar = false, hasta = 10) => {
    let salida = "";
    
    for (let i = 0; i <= hasta; i++) {
        
        salida += `${base} x ${i} = ${ base * i}\n`;
    }
    
    if (listar){
        
        
            console.log("==============================".green)
            console.log("Tabla del ", base);
            console.log("==============================".green)
          
        console.log(salida);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

    return `Tabla-${base}.txt creada`;
}

module.exports = {
    crearArchivo
}