import { dbConnection } from "@/dbConnection/dbConnection";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout Success", success: true },
      { status: 200 }
    );

    // Set the "auth" cookie to expire immediately
    response.cookies.set({
      name: "auth",
      value: "",
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error.message || "An error occurred", success: false },
      { status: 500 }
    );
  }
}

