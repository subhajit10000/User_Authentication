import express from "express";
import { register} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    apiLimiter,
    loginLimiter,
    registerLimiter,
    resetPasswordLimiter,
} from "../middlewares/rateLimiter.js";
import logger from "../utils/logger.js";

const router = express.Router();

// 1. Router-level logging middleware (logs all incoming hits to /api/v1/auth/*)
router.use((req, res, next) => {
    logger.info(`[Auth Router] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
});

// 2. Specialized route logger helper for specific endpoints
const logRoute = (routeName) => (req, res, next) => {
    logger.info(`[Auth Router] Executing ${routeName} route handler`);
    next();
};

// Route Definitions
router.post(
    "/register",
    registerLimiter,
    logRoute("Register"),
    register
);


export default router;