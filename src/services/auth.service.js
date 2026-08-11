import ApiError from "../utils/apiError.js";
import {
    createUser, findUserByEmail, findUserById, updateUser, deleteUser
} from "../repositories/user.repository.js";

const registerService = async (payload) => {
    const existingUser = await findUserByEmail(payload.email);

    if (existingUser) {
        throw new ApiError(400, "Existing User");
    }

    const user = await createUser(payload);

    return user;
}


export { registerService }