const jwt = require('jsonwebtoken');
const errors = require('../util/errors/error-handlers');

module.exports =  (req, res, next) => {
    const authHeader = req.get('Authorization');
    errors.errorCheckHandler(authHeader, "Not authenticate.");
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try{
        decodedToken =  jwt.verify(token, 'fitzFarSeerIsTheTrueKingOfTheSixDuchies');
    }catch (err) {
        err.statusCode = 500;
        // it is not an async task so i can just throw an error
        throw err;
    }
    errors.errorCheckHandler(decodedToken, "Not authenticate.");
    req.userId = decodedToken.userId;
    next();
};