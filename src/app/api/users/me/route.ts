import { dbConnection } from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
dbConnection();

export async function GET(request: NextRequest) {
	const token = request.cookies.get("auth")?.value || "";
	const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
	const user = await User.findById(decodedToken.id).select("-password");
	return NextResponse.json(
		{
			message: "Current User Found",
			data: user,
		},
		{ status: 200 }
	);
}
