import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    logger.error(error);

    // 1. Handle MongoDB Duplicate Key Error (E11000)
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        const message = `Duplicate field value entered: ${field} '${value}' already exists.`;
        error = new ApiError(409, message); // 409 Conflict
    }

    // 2. Handle Mongoose Validation Error (e.g. required fields missing)
    if (error.name === "ValidationError") {
        const message = Object.values(error.errors).map((val) => val.message).join(", ");
        error = new ApiError(400, message); // 400 Bad Request
    }

    // 3. Fallback for unhandled standard errors
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error.";
        error = new ApiError(statusCode, message);
    }

    // Send formatted JSON error response
    return res.status(error.statusCode).json({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors || [],
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        timestamp: new Date().toISOString()
    });
};

export default errorHandler;
