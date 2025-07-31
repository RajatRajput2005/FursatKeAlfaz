import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const decoded = verifyToken(req);
  if ("status" in decoded) return decoded;

  try {
    const { poemId } = await req.json();
    if (!poemId) return NextResponse.json({ message: "Poem ID required" }, { status: 400 });

    // Check if already liked
    const existing = await prisma.like.findFirst({
      where: {
        userId: decoded.id,
        poemId: poemId
      }
    });

    if (existing) {
      return NextResponse.json({ message: "Already Liked" }, { status: 400 });
    }

    const like = await prisma.like.create({
      data: {
        userId: decoded.id,
        poemId: poemId
      }
    });

    return NextResponse.json({ message: "Poem Liked", like });
  } catch (error) {
    console.log("Like Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
