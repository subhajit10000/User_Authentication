import User from "../models/user.js";
const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};
const findUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export { createUser, findUserByEmail, findUserById, updateUser, deleteUser };
