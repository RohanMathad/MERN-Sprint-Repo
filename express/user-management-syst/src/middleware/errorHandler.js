

const errorHandler = (err, req, res, next) => {

    console.log(err.stack)

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success :false,
        error : err.message || 'server error'
    })
}

module.exports = errorHandler;