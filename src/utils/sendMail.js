import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text, html = null) => {
    try {
        // Validate inputs
        if (!to || !subject || !text) {
            throw new Error("Recipient, subject, and text body are required.");
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: `"My App" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            text,
            html
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);
    } catch (error) {
        console.error(`❌ Failed to send email: ${error.message}`);
    }
}

export default sendEmail;
