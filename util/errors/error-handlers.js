const { validationResult } = require('express-validator/check');

exports.validationResultErrorHandler = (req) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        // console.log(error.data);
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
        const error = new Error(msg);
        error.statusCode = statuseCode;
        throw error;
    }
};