const { validationResult } = require('express-validator/check');

exports.validationResultErrorHandler = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        throw error;
    }
};

exports.asyncErrorHandler = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
};

exports.errorCheckHandler = (valid, msg , statuseCode) => {
    if (!valid) {
        console.log(msg);
        const error = new Error(msg);
        error.statusCode = statuseCode;
        throw error;
    }
};