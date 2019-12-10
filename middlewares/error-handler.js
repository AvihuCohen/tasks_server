module.exports = (err, req, res, next) => {
    console.log("Errrror");
    let message = err.message || "Error Not Found";
    let statusCode = err.statusCode || 500;
    res.status(statusCode).json({message: message, err: err});
};