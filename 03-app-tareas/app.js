import colors from 'colors';
import { leerDB, guardarDB } from './helpers/guardaArchivo.js';

import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';



const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
     
        switch (opt) {
            case '1':
                //Crear opción
                const desc = await leerInput('Descripción: ');
                tareas.creatTarea( desc )
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
              
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id!== 0) {
                    
                    const ok = confirmar('¿Estás seguro de borrar dicho elemento?');
                    
                    if (ok) {
                        tareas.borrarTatea( id );
                        console.log('Tarea borrada con exito');
                    }
                }
                break;
        
            default:
                break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();


    } while (opt !== '0');


};


main();