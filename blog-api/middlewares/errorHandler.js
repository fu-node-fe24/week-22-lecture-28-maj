export default function errorHandler(error, req, res, next) {
    res.status(error.status).json({
        succes : false,
        message : error.message
    });
}