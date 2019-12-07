module.exports = (err, req, res, next) => {
    console.log("error middleware");
    let message = err.message;
    let data = err.data;
    let statusCode = err.statusCode || 500;
    res.status(statusCode).json({message: message, data: data});
};