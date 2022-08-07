require('colors');




const mostrarMenu = () => {


    return new Promise( resolve => {
        console.clear();
        console.log("=================================".green);
        console.log(" Seleccione una opción ".green);
        console.log("=================================\n".green);
    
        console.log(`${'1.'.green}. Crear una tarea`);
        console.log(`${'2.'.yellow}. Listar tareas`);
        console.log(`${'3.'.gray}. Listar tareas completadas`);
        console.log(`${'4.'.magenta}. Listar tareas pendientes`);
        console.log(`${'5.'.blue}. Completar tarea(s)`);
        console.log(`${'6.'.red}. Borrar tarea`);
        console.log(`${'0.'.white}. Salir\n`);
        
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opción: ', (e)=>{
            readline.close();
            resolve(e);
        })
    })
  



};



const pause = () => {

    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (e)=>{
            readline.close();
            resolve();
        })
    });
    
};



module.exports = {
    mostrarMenu,
    pause
}