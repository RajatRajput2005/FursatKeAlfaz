import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/middleware/auth";

// ✅ Create Poem — POST Method
export async function POST(req: NextRequest) {
  const decoded = verifyToken(req);
  if ("status" in decoded) return decoded;

  try {
    const { title, content, category } = await req.json();
    if (!title || !content || !category) {
      return NextResponse.json({ message: "Title, Content & Category required" }, { status: 400 });
    }

    const poem = await prisma.poem.create({
      data: {
        title,
        content,
        category,
        authorId: decoded.id
      }
    });

    return NextResponse.json({ message: "Poem Created", poem });
  } catch (error) {
    console.log("Poem Create Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// ✅ Get Poems — GET Method with Category Filter
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const poems = await prisma.poem.findMany({
      where: category ? { category } : {},
      include: {
        author: { select: { id: true, name: true, email: true } },
        _count: { select: { likes: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ poems });
  } catch (error) {
    console.log("Get Poems Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// ✅ Delete Poem — DELETE Method
export async function DELETE(req: NextRequest) {
  const decoded = verifyToken(req);
  if ("status" in decoded) return decoded;

  try {
    const { poemId } = await req.json();
    if (!poemId) return NextResponse.json({ message: "Poem ID required" }, { status: 400 });

    const poem = await prisma.poem.findUnique({ where: { id: poemId } });
    if (!poem) return NextResponse.json({ message: "Poem Not Found" }, { status: 404 });

    if (poem.authorId !== decoded.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await prisma.like.deleteMany({ where: { poemId } });
    await prisma.poem.delete({ where: { id: poemId } });

    return NextResponse.json({ message: "Poem Deleted" });
  } catch (error) {
    console.log("Delete Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// ✅ Update Poem — PUT Method
export async function PUT(req: NextRequest) {
  const decoded = verifyToken(req);
  if ("status" in decoded) return decoded;

  try {
    const { poemId, title, content } = await req.json();
    if (!poemId || !title || !content) {
      return NextResponse.json({ message: "Poem ID, Title & Content required" }, { status: 400 });
    }

    const poem = await prisma.poem.findUnique({ where: { id: poemId } });
    if (!poem) return NextResponse.json({ message: "Poem not found" }, { status: 404 });
    if (poem.authorId !== decoded.id) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    await prisma.poem.update({
      where: { id: poemId },
      data: { title, content }
    });

    return NextResponse.json({ message: "Poem Updated" });
  } catch (error) {
    console.log("Update Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
