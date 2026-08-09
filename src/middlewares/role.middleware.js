import ApiError from "../utils/apiError";

const Authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError(401, "Unauthorized. please login first"));
        }
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(401, "Unauthorized. you don't have permission to access this route"));
        }
        next();
    };
};
export default Authorize;