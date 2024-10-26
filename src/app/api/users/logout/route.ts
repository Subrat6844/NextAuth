import { dbConnection } from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
async function GET() {
	const response = NextResponse.json(
		{ message: "Logout Success", success: true },
		{ status: 200 }
	);
	response.cookies.set("auth", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	return response;
}
