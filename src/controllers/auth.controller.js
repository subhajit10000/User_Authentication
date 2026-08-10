import {asyncHandler} from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { registerService } from "../services/auth.service.js";

const register = asyncHandler(async (req, res) => {
  const result = await registerService(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, 'User registered successfully', result));
});



export {
  register
};