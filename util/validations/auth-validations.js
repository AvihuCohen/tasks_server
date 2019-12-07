const {body} = require('express-validator/check');
const User = require('../../models/user');

exports.signupValidations =
    [
        body('email')
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom((email, {req}) => {
                return User.findOne({email: email})
                    .then(user => {
                        if (user) {
                            return Promise.reject('E-Mail address already exists!');
                        }
                    });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 5}),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ];


exports.loginValidations =
    [
        body('email')
            .isEmail()
            .withMessage("Please enter a valid email")
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 5}),
    ];

exports.editProfileValidations =
    [
        body('email')
            .isEmail()
            .withMessage("Please enter a valid email")
            .normalizeEmail(),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ];