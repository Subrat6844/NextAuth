import { dbConnection } from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json();

		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return NextResponse.json(
				{ error: "Invalid Token or Expired" },
				{ status: 400 }
			);
		}

		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
		await user.save();

		return NextResponse.json(
			{ message: "Email Verified Successfully", success: true },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message, success: false },
			{ status: 500 }
		);
	}
}
