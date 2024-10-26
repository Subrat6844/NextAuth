import { dbConnection } from "@/dbConnection/dbConnection";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConnection()


export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { userName, email, password } = body;
		console.log(body);
		
		if (!userName || !email || !password) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}
		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		const salts = await bcryptjs.genSalt(10);

		const hashedPassword = await bcryptjs.hash(password, salts);
		const createdUser = new User({ userName, email, password: hashedPassword });
		const savedUser = await createdUser.save();
		await sendMail({ email, mailType: "verifyEmail", userId: savedUser._id });
		return NextResponse.json(
			{
				message: "User created successfully",
				user: savedUser,
				success: true,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
