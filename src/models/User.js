import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

import {generateAccessToken, generateRefreshToken} from "../config/jwt.js";

const userSchema = new mongoose.Schema( 
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,  
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email");
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        phone: {
            type: String,
            required: true,
            default: ""
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        lastLogin: {
            type: Date,
        }   
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
};

userSchema.methods.generateAccessTokens = function() {
    return generateAccessToken({ id: this._id, email: this.email, role: this.role });
};

userSchema.methods.generateRefreshTokens = function() {
    return generateRefreshToken({ id: this._id});
};

const User = mongoose.model("User", userSchema);

export default User;