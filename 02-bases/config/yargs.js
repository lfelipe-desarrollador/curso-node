const argv = require('yargs')
                  .option('b', {
                     alias: 'base',
                     type: 'number',
                     demandOption: true,
                     describe: 'Toma la base sobre la cual se va a realizar la tabla'
                  })
                  .check( (argv, options) =>{
                     if (isNaN( argv.b )) {
                        throw 'La base tiene que ser un número'
                     }
                     return true;
                  })
                  .option('l', {
                     alias: 'listar',
                     type: 'boolean',
                     default: false,
                     describe: 'Decide si desea ver en consola o no la tabla'
                  })
                  .option('h',{
                     alias: 'hasta',
                     type: 'number',
                     default: 10,
                     describe: 'Hasta donde se extiende la tabla de multiplicar'
                  })
                  .argv;



module.exports = argv;