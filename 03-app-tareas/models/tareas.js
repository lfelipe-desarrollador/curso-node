import Tarea from "./tarea.js";


class Tareas{

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach( key => listado.push( this._listado[key] ) )

        return listado;

    }

    constructor(){
        this._listado = {};
    }

    borrarTatea(id=''){

        if (this._listado[id]) {
            delete this._listado[id];
        }

    };

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto(){

        //Opción mia, mi implementación
        // for (let index = 1; index < this.listadoArr.length; index++) {
        //     console.log(`${ `${index}.`.green } ${this.listadoArr[index]['desc']} :: ${this.listadoArr[index]['completadoEn'] ? 'completado'.green : 'pendiente'.red} `);
            
        // }

        //Opción de fernando
        this.listadoArr.forEach((tarea, i)=>{
            const idx = `${i + 1}.`.green;

            const {desc, completadoEn} = tarea;

            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);

        })
    };

    listarPendientesCompletadas( completadas = true ){

        if (completadas) {
            const tareasDone = this.listadoArr.filter( tarea => tarea.completadoEn != null );
            tareasDone.forEach((tarea, i)=>{
                const idx = `${i + 1}.`.green;
    
                const {desc, completadoEn} = tarea;
    
                const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
    
                console.log(`${idx} ${desc} :: ${completadoEn}`);
    
            })
        }else{
            const tareasDone = this.listadoArr.filter( tarea => tarea.completadoEn == null );
            tareasDone.forEach((tarea, i)=>{
                const idx = `${i + 1}.`.green;
    
                const {desc, completadoEn} = tarea;
    
                const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
    
                console.log(`${idx} ${desc} :: ${estado}`);
    
            })
        }

    };

    creatTarea( desc = '' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    toggleCompletadas(ids= []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
               
            }
        })
    }

};


export default Tareas;