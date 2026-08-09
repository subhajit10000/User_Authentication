import mongoose from 'mongoose';
//device information

const refreshTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        token: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 } // This will automatically remove the document after the specified time
        },
        userAgent: {
            type: String,
            default: ""
        },
        ipAddress: {
            type: String,
            default: ""
        }
    },
    { timestamp: true }
);

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;