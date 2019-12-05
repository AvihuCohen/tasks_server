const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator/check');
const errorHandler = require('./errors/error-handlers');
const User = require('../models/user');


exports.signup = async (req, res, next) => {
    errorHandler.validationResultErrorHandler(req);
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const imagePath = req.file.path;

    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            name: name,
            password: hashPassword,
            imagePath: imagePath
        });

    } catch (err) {
        errorHandler.asyncErrorHandler(err, next);
    }
};


exports.login = async (req, res, next) => {
    errorHandler.validationResultErrorHandler(req);
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    try {
        const user = await User.findOne({email: email});
        errorHandler.errorCheckHandler(user, 'A user with this email could not be found.');
        const isEqual = await bcrypt.compare(password, user.password);
        errorHandler.errorCheckHandler(isEqual, 'Wrong password');
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            'fitzFarSeerIsTheTrueKingOfTheSixDuchies',
            {expiresIn: '1h'}
        );
        res.status(200).json({token: token, userId: user._id.toString()});

    } catch (err) {
        errorHandler.asyncErrorHandler(err, next);

    }
};

exports.getUserProfile = (req, res, next) => {

}
exports.editUserProfile = (req, res, next) => {

}
exports.deleteUserProfile = (req, res, next) => {

}



