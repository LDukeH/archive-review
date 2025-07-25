import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.getAll("tags");

  console.log("Tags received:", tags);

  try {
    const book = await prisma.review.findMany({
      where:
        tags.length > 0
          ? {
              type: "book",
              AND: tags.map((tagName) => ({
                tags: {
                  some: {
                    name: tagName,
                  },
                },
              })),
            }
          : {
              type: "book",
            },
      include: {
        tags: true,
      },
    });
    if (book.length === 0) {
      return NextResponse.json({ message: "No books found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching book by tags", error);
    return NextResponse.json(
      { error: "Failed to fetch book by tags" },
      { status: 500 }
    );
  }
}
