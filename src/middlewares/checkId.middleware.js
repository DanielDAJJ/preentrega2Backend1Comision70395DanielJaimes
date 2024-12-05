export const checkId = (req, res,next) =>{
    const {id} = req.params;
    if(isNaN(id)){
        return res.send('debes ingresar un ID numerico');
    };
    next();
}