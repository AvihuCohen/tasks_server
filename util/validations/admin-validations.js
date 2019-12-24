const {body} = require('express-validator/check');

// Todo add messages to validations
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

exports.addTodoItemValidations =
    [
        body('task')
            .trim()
            .not()
            .isEmpty()
    ];

exports.editTodoItemValidations =
    [
        body('task')
            .trim()
            .not()
            .isEmpty(),
        body('note')
            .trim()
            .isLength({ max: 120 })
        ,
        body('completed')
            .isBoolean(),
        body('important')
            .isBoolean()
    ];