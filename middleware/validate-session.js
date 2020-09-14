const jwt = require('jsonwebtoken');
const user = require('../db').import('../models/usermodel');


const validateSession = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next(); 
    
    } else {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided'})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {

            if (!err && decodeToken) {
                user.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {
                    if (!user) throw err;
                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.error = err;
                return res.status(500).send('Not Authorized');
            }
        });
     }  
    }
};

module.exports = validateSession;