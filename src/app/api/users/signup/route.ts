import { dbConnection } from "@/dbConnection/dbConnection";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
dbConnection();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { userName, email, password } = body;

        if (!userName || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
		const createdUser = await User.create({ userName, email, password });
        sendMail({email, mailType: "verifyEmail", userId: user._id})
		return NextResponse.json({ user });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
