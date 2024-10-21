import nodemailer from "nodemailer";

export const sendMail = async ({email, mailType, userId}:any) => {
	try {
        const transporter = nodemailer.createTransport({
        		host: "smtp.ethereal.email",
        		port: 587,
        		secure: false, // true for port 465, false for other ports
        		auth: {
        			user: "maddison53@ethereal.email",
        			pass: "jn7jnAPss4f63QBp6D",
        		},
        	});
        
        	const mailOptions = {
        		from: "subrat@chaudhary.ai",
        		to: email,
        		subject: mailType === "forgotPassword" ? "Reset Your Password" : "Verify Your Email",
        		html: "<b>Hello world?</b>",
        	};
        
            const mailResponse = await transporter.sendMail(mailOptions);
            return mailResponse
    } catch (error:any) {
        throw new Error(error.message);   
    }
};
