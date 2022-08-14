


const esAdminRole = (req, res, next) => {
  
    if (!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token primero'
        });
    }

    if (req.usuario.rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'No tienes permisos para hacer eso'
        });
    };

    next()

};


const tieneRole = ( ...roles ) => {
  
    return (req, res, next) => {

        if (!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: 'Tu rol no tiene permisos para hacer eso'
            });
        };

        next();
    }

}


export {
     esAdminRole,
     tieneRole
}