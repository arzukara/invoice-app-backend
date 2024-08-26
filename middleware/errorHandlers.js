// Custom HttpError class to handle various HTTP errors
export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// Error handling middleware
export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
}

// 404 handling middleware
export function notFoundHandler(req, res, next) {
    res.status(404).json({ error: 'Resource not found' });
}
