import Jwt from "jsonwebtoken"


const generarJWT = (uid='') => {
  

    return new Promise( (resolve, reject) => {
      
        const payload = { uid };

        Jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, toekn) =>{
            if(err){
                reject(err);
            }else{
                resolve(toekn);
            }
        })

    })

};



export default generarJWT;