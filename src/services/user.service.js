import {
  findUserById,
  findUserByIdWithPassword,
  updateUser,
  deleteUser,
  findAllUsers
} from "../repositories/user.repository.js";

import encryptionService from "./encryption.service.js";
import ApiError from "../utils/ApiError.js";
import { revokeAllRefreshTokens } from "./token.service.js";

//Get User Profile
const getProfileService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const profile = user.toObject();
  if (profile.phone) {
    profile.phone = encryptionService.decrypt(profile.phone);
  }
  return profile;
};


const getAllUsersService = async () => {
  const users = await findAllUsers();
  return users;
};


//Update User Profile
const updateProfileService = async (userId, payload) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (payload.phone) {
    payload.phone = encryptionService.encrypt(payload.phone);
  }
  const updatedUser = await updateUser(userId, payload);
  const response = updatedUser.toObject();
  if (response.phone) {
    response.phone = encryptionService.decrypt(response.phone);
  }
  return response;
};


//Delete User profile
const deleteProfileService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await deleteUser(userId);
  await revokeAllRefreshTokens(userId);
  return null;
};

//change password
const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await findUserByIdWithPassword(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }
  user.password = newPassword;
  await user.save();

  // Force re-login on all other sessions after a password change.
  await revokeAllRefreshTokens(userId);
  return true;
};



// Admin

const getUserByIdService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const profile = user.toObject();
  if (profile.phone) {
    profile.phone = encryptionService.decrypt(profile.phone);
  }
  return profile;
};

const updateUserRoleService = async (userId, role) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const updated = await updateUser(userId, { role });
  return updated.toObject();
};

const updateUserStatusService = async (userId, isBlocked) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const updated = await updateUser(userId, { isBlocked });

  // Blocking a user should kill their existing sessions immediately, otherwise a live access token keeps working until it expires.
  if (isBlocked) {
    await revokeAllRefreshTokens(userId);
  }

  return updated.toObject();
};

const adminDeleteUserService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await deleteUser(userId);
  await revokeAllRefreshTokens(userId);
  return null;
};

export {
  getProfileService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getUserByIdService,
  updateUserRoleService,
  updateUserStatusService,
  adminDeleteUserService,
  getAllUsersService
};
