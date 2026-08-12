import crypto from "crypto";
import env from "../config/env.js";

const generateOTP = (length = Number (env.OTP_LENGTH) || 6 ) => {   
    const digits = "0123456789";
    let otp = "";   
    while (otp.length < length) {
        const randomIndex = crypto.randomInt(0, digits.length);
        otp += digits[randomIndex];
    }
    return otp;
};