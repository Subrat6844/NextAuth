import User from "@/models/userModel";
import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";
export const sendMail = async ({ email, mailType, userId }: any) => {
	try {
		const token = uuid();
		if (mailType === "verifyEmail") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: token,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		}
		if (mailType === "forgotPassword") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: token,
				forgotPasswordExpiry: Date.now() + 3600000,
			});
		}
		var transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
		});

		const mailOptions = {
			from: "subrat@chaudhary.ai",
			to: email,
			subject:
				mailType === "forgotPassword"
					? "Reset Your Password"
					: "Verify Your Email",
			html:
				mailType === "forgotPassword"
					? `<div>
					<h2>Password Reset Request</h2>
					<p>Hello User,</p>
					<p>We received a request to reset your password. If you did not request this, please ignore this email.</p>
					<p>To reset your password, click the link below:</p>
					<p><a href=${process.env.DOMAIN}/forgotPassword?token=${token} class="button">Reset Password</a></p>
					<p>Thank you!</p>
					<p>Best regards,<br>Your Company Name</p>
				</div>`
					: `<div>
					<h1>Please Verify Your Email Address</h1>
					<p>Dear New User,</p>
					<p>Thank you for signing up! To complete your registration, please verify your email address by clicking the link below:</p>
					<a href=${process.env.DOMAIN}/verifyEmail?token=${token}>Verify Email Address</a>
					<p>or copy the link below into your browser</p>
					<p>${process.env.DOMAIN}/verifyEmail?token=${token}</p>
					<p>If you did not create an account, no further action is required.</p>
					<p>Best regards,<br>XYZ Inc.</p>
   				 </div>`,
		};

		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
