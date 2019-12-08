module.exports = (err, req, res, next) => {
    console.log(err);
    let message = err.message;
    let statusCode = err.statusCode || 500;
    res.status(statusCode).json({message: message, err: err});
};