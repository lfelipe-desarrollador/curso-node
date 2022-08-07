console.log("Inicio de programa");


// Un callback es una función que se manda como argumento, nada más

setTimeout( ()=>{
    console.log("primer timeout");
}, 3000 );

setTimeout( ()=>{
    console.log("segundo timeout");
}, 0 );

setTimeout( ()=>{
    console.log("tercer timeout");
}, 0 );



console.log("Fin de programa");