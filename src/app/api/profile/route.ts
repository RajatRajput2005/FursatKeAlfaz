import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware/auth";

export async function GET(req: NextRequest) {
  const decoded = verifyToken(req);
  if ("status" in decoded) return decoded; // Unauthorized or Invalid Token

  return NextResponse.json({ message: "Protected Route Accessed", user: decoded });
}
