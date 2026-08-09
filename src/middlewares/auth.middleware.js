import User from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import AsyncHandler from 'express-async-handler';
import { verifyAccessToken } from '../config/jwt.js';
import logger from '../utils/logger.js';

const authMiddleware = AsyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    if (!token && !req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    if (!token) {
        throw new ApiError(401, 'Unauthorized. please login first');
    }

    const decode = verifyAccessToken(token);   
    const user = await User.findById(decode.id);
    logger.info(user);

    if (!user) {
        throw new ApiError(401, 'user not found');
    }

    if (user.isBlocked) {
        throw new ApiError(403, 'your account is blocked');
    }

    req.user = user;
    next();
});

export default authMiddleware;
