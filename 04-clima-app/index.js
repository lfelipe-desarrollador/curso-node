import 'dotenv/config';

import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";
import Busquedas from "./models/busquedas.js";



const main = async() => {
  
    const busquedas = new Busquedas();

    let opt;


    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ')

                //Buscar el lugar/es
                const lugares = await busquedas.ciudad( termino );

                //Seleccionar el lugar
                const id = await listarLugares( lugares );

                if (id === '0') continue;

                
                const lugarSel = lugares.find( lugar => lugar.id === id );       
                busquedas.agregarHistorial( lugarSel.nombre );
                
                //Clima
                const { desc, min, max, temp } = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                //Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura:', temp);
                console.log('Mínima', min);
                console.log('Máxima', max);
                console.log('Cómo está el clima: ', desc);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i + 1}.`.green;  
                    console.log(`${idx} ${lugar}`);
                })
                break;
        
            default:
                break;
        }

        
        await pausa();



    } while (opt !== 0 );

};

main();
