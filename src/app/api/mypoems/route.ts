// src/app/api/mypoems/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const decoded = verifyToken(req);
  if ("status" in decoded) return decoded;

  try {
    const poems = await prisma.poem.findMany({
      where: { authorId: decoded.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { likes: true } }
      }
    });

    return NextResponse.json({ poems });
  } catch (error) {
    console.log("Get My Poems Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
