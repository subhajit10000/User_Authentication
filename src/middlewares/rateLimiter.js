import rateLimit from 'express-rate-limit';
import ApiError from '../utils/apiError.js';

const apiLimiter = rateLimit({
    windowsMs: Number(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    standardHeaders: true,
    legacyHeaders: false,

    message: new ApiError(429, 'Too many requests, please try again later.')
});

const loginLimiter = rateLimit({
    windowsMs:  15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: new ApiError(429, 'Too many login attempts, please try again after some time.'),
});

const registerLimiter = rateLimit({
    windowsMs:  60 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: new ApiError(429, 'Too many registration attempts, please try again after some time.'),
});


const resetPasswordLimiter = rateLimit({
    windowsMs:  60 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: new ApiError(429, 'Too many password reset attempts, please try again after some time.'),
});

module.exports = {
    apiLimiter,
    loginLimiter,
    registerLimiter,
    resetPasswordLimiter
};