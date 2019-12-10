const jwt = require('jsonwebtoken');
const errors = require('../util/errors/error-handlers');

module.exports =  (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    // console.log("token - " + req.get('Authorization'));
    errors.errorCheckHandler(token, "Not authenticate.");
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