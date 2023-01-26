const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mynameiskhan';

//middlware is also a fxn, which accepts req, res, and next(will call next fxn, where we use this middleware)
const decode = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({error: "Please provide authentication Token!"});
    }
    try {
        const checkToken = jwt.verify(token, JWT_SECRET);
        req.user = checkToken.user; //appending req's body with user obj(get using jwt.verify method)
        next(); //calling next fxn    
    } catch (e) {
        return res.status(401).json({error: "Please provide a valid authentication Token!"});
    }
    
}

module.exports = decode