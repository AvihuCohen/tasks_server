exports.validationResultErrorHandler = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
};

exports.asyncErrorHandler = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
};

exports.errorCheckHandler = (valid, msg) => {
    if (!valid) {
        const error = new Error(msg);
        error.statusCode = 401;
        throw error;
    }
};