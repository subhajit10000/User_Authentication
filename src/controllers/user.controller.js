import { asyncHandler } from '../utils/asyncHandler.js';
import sendResponse from "../helpers/response.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
    getProfileService,
    updateProfileService,
    deleteProfileService,
    changePasswordService,
    getUserByIdService,
    getAllUsersService,
    updateUserRoleService,
    updateUserStatusService,
    adminDeleteUserService,
} from "../services/user.service.js";

const getProfile = asyncHandler(async (req, res) => {
    const user = await getProfileService(req.user._id);
    return sendResponse(res, 200, "Profile fetched successfully", user);
});


const updateProfile = asyncHandler(async (req, res) => {
    const updatedUser = await updateProfileService(req.user._id, req.body);
    return sendResponse(res, 200, "Profile updated successfully", updatedUser);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Users fetched successfully",
      users
    )
  );
});

const deleteProfile = asyncHandler(async (req, res) => {
    await deleteProfileService(req.user._id);
    return sendResponse(res, 200, "Profile deleted successfully");
});


const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await changePasswordService(req.user._id, currentPassword, newPassword);
    return sendResponse(res, 200, "Password changed successfully");
})


//  Admin 

const getUserById = asyncHandler(async (req, res) => {
    const user = await getUserByIdService(req.params.id);
    return sendResponse(res, 200, "User fetched successfully", user);
});

const updateUserRole = asyncHandler(async (req, res) => {
    const user = await updateUserRoleService(req.params.id, req.body.role);
    return sendResponse(res, 200, "User role updated successfully", user);
});

const updateUserStatus = asyncHandler(async (req, res) => {
    const user = await updateUserStatusService(req.params.id, req.body.isBlocked);
    return sendResponse(res, 200, "User status updated successfully", user);
});

const adminDeleteUser = asyncHandler(async (req, res) => {
    await adminDeleteUserService(req.params.id);
    return sendResponse(res, 200, "User deleted successfully");
});

export {
    getProfile,
    updateProfile,
    deleteProfile,
    changePassword,
    getUserById,
    updateUserRole,
    updateUserStatus,
    adminDeleteUser,
    getAllUsers
};
