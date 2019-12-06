const {body} = require('express-validator/check');


exports.editOrCreateListValidations =
    [
        body('name')
            .trim()
            .not()
            .isEmpty(),
        body('isPublic')
            .isBoolean()
    ];

exports.removeListValidations =
    [
        body('name')
            .trim()
            .not()
            .isEmpty()
    ];