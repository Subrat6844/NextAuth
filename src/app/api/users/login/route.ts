import { dbConnection } from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

dbConnection();

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { email, password } = body;
	console.log(body);

	if (!email || !password) {
		return NextResponse.json(
			{ error: "All fields are required" },
			{ status: 400 }
		);
	}

	const user = await User.findOne({ email }).select("-password");
	if (!user) {
		return NextResponse.json(
			{ error: "User does not Exists" },
			{ status: 400 }
		);
	}
	const isPasswordCorrect = await bcryptjs.compare(password, user.password);
	if (!isPasswordCorrect) {
		return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });
	}
	const tokenData = {
		id: user._id,
		username: user.userName,
		email: user.email,
	};

	const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
		expiresIn: "1d",
	});
	const response = NextResponse.json({ user }, { status: 200 });
	response.cookies.set("auth", token, {
		httpOnly: true,
	});
	return response;
}
