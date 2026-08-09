import ApiError from "../utils/apiError";
const errorHandler = (err, req, res, next) => {
    let error = err;
    if (error instanceof ApiError) {
        error = new ApiError(500, error.message || 'Internal Server Error');
    }
    
    return res.status(error.statusCode).json({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors || [],
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString()
    });
};

export default errorHandler;