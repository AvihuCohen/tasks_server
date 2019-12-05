module.exports = (err, req, res, next) => {
    let message = err.message;
    let data = err.data;
    let statusCode = err.statusCode || 500;
    res.status(statusCode).json({message: message, data: data});
};