
import pep from 'express-validator';


const { validationResult } = pep;

const validarCampos = ( req, res, next ) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    };

    next();

};


export {
    validarCampos
}


