import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  }
}
// src/middleware/auth.ts